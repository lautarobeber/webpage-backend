import Stripe from "stripe";
import { SECRET_KEY_STRIPE } from "../config.js";
import Order from "../models/sql_models/order.model.js";
import { getProductsByCart } from "./cart.controllers.js";
const SECRET_KEY_STRIPE_WEBHOOK = process.env.SECRET_KEY_STRIPE_WEBHOOK
import { Cart } from "../models/sql_models/cart.model.js";
import Product_Cart from "../models/sql_models/product_cart.model.js";
import { Product } from "../models/sql_models/products.model.js";
import { sequelize } from "../db.js";
import { Order_Product } from "../models/sql_models/order_product.model.js";
const stripe = new Stripe(SECRET_KEY_STRIPE);
const PORT = process.env.APP_HOST

let temporaryOrderData = {};
let producstInCart = {};
let singleShop = {};

export const createSession = async (req, res) => {
  const data = req.body;
  console.log(data);
try{


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: data.product_name || "Sin nombre",
          },

          currency: "usd",
          unit_amount: data.price * 100 || 120000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${PORT}/succes`,
      cancel_url: `${PORT}/products`,
  });
  temporaryOrderData = {
    email: data.user,
    date: new Date(),
    status: "PENDIENTE DE ENVIO",
    total: data.price,
    direction: data.payer.adress,
    state: data.payer.province,
    city: data.payer.city,
    direction: data.payer.adress,
    number: data.payer.number,
    id_user: data.user,
    floor: data.payer.floor,
    depto: data.payer.depto,

    user_name: data.payer.name_user,
    user_surname: data.payer.surname_user,
    phone_number: data.payer.phone || 'no num',
    zip: data.payer.zip,
  };

  singleShop = {
    id_product: data.id,

    selectedSize: data.selectedSize,
    //id order
  };

  /*    email: data.user,
      date: new Date(),
      status: data.status,
      total: productsByCarts.reduce(
        (accumulator, product) =>
        accumulator + parseFloat(product.Product.price),
        0
      ).toFixed(2), //sumar precio
      state: data.province,
      city: data.city,
      direction: data.adress,
      number: data.number,
      floor: data.floor || null,
      depto: data.depto || null,
      zip: data.zip,
      id_user: data.user,
       */
  return res.json(session);

}catch(e){
  return res.status(500).json({message: e.message})
}
};
export const createSessionFromCart = async (req, res) => {
  const data = req.body;
  try {
    const cartFound = await Cart.findOne({
      where: {
        id_user: data.user,
      },
    });

    if (!cartFound) {
      return res.status(404).json({
        message: "No se encontró el carrito que contiene este producto",
      });
    }
    const productsByCarts = await Product_Cart.findAll({
      where: {
        id_cart: cartFound.id_cart,
      },
      include: [
        {
          model: Product,
          // Solo recuperar el nombre de las categorías
        },
      ],
    });
    if (!productsByCarts) {
      return res.status(404).json({
        message: "No se encontraron productos en el carrito",
      });
    }
    //mapear productsbyCarts en la session
    /*   return console.log(productsByCarts[0]) */

    const session = await stripe.checkout.sessions.create({
      line_items: productsByCarts.map((product) => ({
        price_data: {
          currency: "usd",
          unit_amount: parseFloat(product.Product.price) * 100 || 120000,
          product_data: {
            name: product.Product.name || "asd", // O un nombre predeterminado si `product.name` no está definido
          },
        },
        quantity: product.quantity || 1,
      })),
      mode: "payment",
      success_url: `${PORT}/succes`,
      cancel_url: `${PORT}/products`,
    });

    temporaryOrderData = {
      email: data.user,
      date: new Date(),
      status: "PENDIENTE DE ENVIO",
      total: productsByCarts
        .reduce(
          (accumulator, product) =>
            accumulator + parseFloat(product.Product.price),
          0
        )
        .toFixed(2), //sumar precio
      state: data.province,
      city: data.city,
      direction: data.adress,
      number: data.number,
      phone_number: data.phone || 'no num',
      user_name: data.user_name,
      user_surname: data.user_surname,
      floor: data.floor || null,
      depto: data.depto || null,
      zip: data.zip,
      id_user: data.user,

      //traer de la orden
    };

    producstInCart = productsByCarts;

    return res.json(session);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const stripeWebhookController = async (req, res) => {
  let event;
  const payload = req.rawBody;
  try {
    // Obtener el cuerpo de la solicitud sin procesar

    const signature = req.headers["stripe-signature"];

    // Construir el evento del webhook
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      SECRET_KEY_STRIPE_WEBHOOK
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        let orderCreated = false;
        //pegar los productos de la orden
        await sequelize.transaction(async (t) => {
          // Itera sobre cada producto en el array
          const orderReady = await Order.create(temporaryOrderData);
          orderCreated = true;

          if (Object.keys(producstInCart).length > 0) {
            for (const product of producstInCart) {
              
              // Inserta el producto en la tabla usando el método create de Sequelize
              await Order_Product.create(
                {
                  quantity: product.quantity,
                  size: product.size,
                  id_product: product.id_product,
                  id_order: orderReady.id_order,
                },
                { transaction: t }
              );
            }
          } else {
            await Order_Product.create(
              {
                quantity: 1,
                size: singleShop.selectedSize,
                id_product: singleShop.id_product,
                id_order: orderReady.id_order,
              },
              { transaction: t }
            );
          }
        });

        if (orderCreated) {
          // La orden y todos los productos se crearon correctamente
          console.log("¡La orden se creó exitosamente!");
        } else {
          // Algo salió mal al crear los productos, por lo que no se creó la orden
          console.log("Hubo un problema al agregar productos a la orden.");
        }

        // Aquí puedes tomar los datos de la orden guardados temporalmente y guardarlos en la base de datos
        // await Order.create(orderData);
        console.log("Payment was successful for session: ", session.id);
        return res.status(200).json({ message: "Payment succesful" });

      // Otros casos para manejar otros tipos de eventos
    }
  } catch (e) {
    console.error("Error al procesar el evento:", e);
    return res.status(500).json({ error: "Error al procesar el evento", e });
  }

  res.status(200).end();
};
