import Order from "../models/sql_models/order.model.js";
import { Order_Product } from "../models/sql_models/order_product.model.js";
import { Product } from "../models/sql_models/products.model.js";
import { User } from "../models/sql_models/users.model.js";

export const getOrders = async (req, res) => {
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
              attributes: ['name'] // Aquí especificamos que queremos el id y el nombre
            }
          ]
        },
      ],
    });
    return res.json(orders).status(201);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};


export const getOrdersByUser = async () => {
  const {user} = req.body
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
              attributes: ['name'] // Aquí especificamos que queremos el id y el nombre
            }
          ]
        },
      ],
      where: {
        id_user: user
      }
    });
    return res.json(orders).status(201);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
}