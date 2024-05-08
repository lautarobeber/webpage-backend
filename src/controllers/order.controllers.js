import { where } from "sequelize";
import Order from "../models/sql_models/order.model.js";
import { Order_Product } from "../models/sql_models/order_product.model.js";
import { Product } from "../models/sql_models/products.model.js";
import { User } from "../models/sql_models/users.model.js";

export const getOrders = async (req, res) => {
  try {
    
    const orders = await Order.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Order_Product,
          include: [
            {
              model: Product,
              attributes: ["name", "image_url"], // Aquí especificamos que queremos el id y el nombre
            },
          ],
        },
      ],
    });
    return res.json(orders).status(201);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

export const getOrdersByUser = async () => {
  const { user } = req.body;
  try {
    console.log("gello");
    const orders = await Order.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Order_Product,
          include: [
            {
              model: Product,
              attributes: ["name", "image_url"], // Aquí especificamos que queremos el id y el nombre
            },
          ],
        },
      ],
      where: {
        id_user: user,
      },
    });
    return res.json(orders).status(201);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

export const updateOrderShipped = async (req, res) => {
  const orderId = req.params.orderId;
  try {
 
    const orderUpdated = Order.update(
      {
        status: "ENTREGADO",
        deliveryDate: new Date(),
      },
      {
        where: {
          id_order: orderId,
        },
      }
    );

    //me falta agregar la fecha de entregado

    /* if(!orderFound) return res(404).json({message: 'Orden no encontrada'}) */

    return res.status(200).json({ orderUpdated });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};
