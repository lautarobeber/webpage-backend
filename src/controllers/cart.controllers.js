import { sequelize } from "../db.js";
import { Cart } from "../models/sql_models/cart.model.js";
import Product_Cart from "../models/sql_models/product_cart.model.js";
import { Product } from "../models/sql_models/products.model.js";
import { User } from "../models/sql_models/users.model.js";

export const createCart = async (req, res) => {
  const { date, id_user } = req.body;

  try {
    const cart = await Cart.create({
      date: data.date,
      id_user: data.id_user,
    });

    return res.json(cart);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const addProductToCart = async (req, res) => {
  const { quantity, id_product, sizes } = req.body.product;
  const sizesAvailables = JSON.parse(sizes);
  const { email } = req.body.user;
  console.log('aca antes')

  try {
    const cartFound = await Cart.findOne({
      where: {
        id_user: email,
      },
    });
    console.log(cartFound, 'aca');
    if (!cartFound) {
      return res.status(404).json({
        message: "No se encontró el carrito que contiene este producto",
      });
    }
    const productInCart = await Product_Cart.findOne({
      where: {
        id_product: id_product,
      },
    });

    if (productInCart) {
      await Product_Cart.update(
        {
          quantity: sequelize.literal("quantity + 1"), // Incrementa el valor actual en 1
        },
        {
          where: {
            id_cart: cartFound.id_cart,
            id_product: productInCart.id_product,
          }, // Filtro para actualizar el registro específico
        }
      );

      return res.status(201).send("Se agregaron unidades al producto");
    }
    const newProductCart = await Product_Cart.create({
      quantity: parseInt(quantity) || 1,
      size: parseInt(sizesAvailables[0]),
      id_product: parseInt(id_product),
      id_cart: cartFound.id_cart,
    });

    return res.status(201).json(newProductCart);
  } catch (e) {
    //status 400 si bad request
    return res.status(500).json({ message: e.message });
  }
};

export const getProductsByCart = async (req, res) => {
  //obtengo el id del usuario (email)

  const { id } = req.params;

  try {
    const cartFound = await Cart.findOne({
      where: {
        id_user: id,
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
    
    return res.json(productsByCarts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteOneProductFromCart = async (req, res) => {
  const { id, email } = req.params;
 
  try {
    const cartFound = await Cart.findOne({
      where: {
        id_user: email,
      },
    });
   
    await Product_Cart.destroy({
      where: {
        id_cart: cartFound.id_cart,
        id_product: id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Producto eliminado del carrito correctamente",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteAllProductsFromCart = async (req, res) => {};
export const quantityCart = async (req, res) => {
  const { user, action } = req.body;

  if (action !== "increment" && action !== "decrement") {
    return res.status(400).json({
      message: "El parámetro 'action' debe ser 'increment' o 'decrement'",
    });
  }

  try {
    let idCartFound = await Cart.findOne({
      where: { id_user: user },
    });

    if (!idCartFound)
      return res.status(404).json({ message: "Internal Server Error" });

    const productCart = await Product_Cart.findOne({
      where: { id_cart: idCartFound.id_cart },
    });

    if (!productCart) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    let newQuantity;

    // Determina el valor a agregar o restar
    if (action === "increment") {
      newQuantity = productCart.quantity + 1;
    } else if (action === "decrement") {
      // Verifica que la cantidad no sea 1 antes de decrementar
      if (productCart.quantity === 1) {
        return res
          .status(400)
          .json({ message: "La cantidad mínima permitida es 1" });
      }
      newQuantity = productCart.quantity - 1;
    }

    // Actualiza la cantidad del producto en el carrito
    await Product_Cart.update(
      { quantity: newQuantity },
      { where: { id_cart: idCartFound.id_cart } }
    );

    const message =
      action === "increment"
        ? "Cantidad incrementada correctamente"
        : "Cantidad decrementada correctamente";

    return res.status(200).json({ message: message });
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
export const setSizeProductsByID = async (req, res) => {
  
  const { id_product } = req.params;
  const { sizeSelected } = req.body;

  if (!id_product)
    return res.status(404).json({ message: "No se ha proporcionado un ID" });
  if (!sizeSelected)
    return res.status(404).json({ message: "No se ha proporcionado un talle" });

  try {
    const productFound = await Product.findOne({
      where: { id_product: id_product },
    });
    if (!productFound)
      return res.status(404).json({ message: "Producto no encontrado" });
    await Product_Cart.update(
      {
        size: sizeSelected,
      },
      {
        where: {
          id_product: productFound.id_product,
        },
      }
    );

    return res.status(201).json({ message: "Size cambiado" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

/*   export const setAdmin = async (req, res) => {
    const {email} = req.body
    if(!email){
      return res.status(500).json({message: "Internal Server Error"})
    }
    try{
      const userFound = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if(!userFound) return res.status(404).json({message: 'User not found'})
  
     
      //update user
      await userFound.update({ admin: true });
  
      res.status(200).json({ message: 'User updated successfully', user: userFound });
  
    }catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  } */
