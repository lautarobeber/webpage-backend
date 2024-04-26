import { User } from "../models/sql_models/users.model.js";

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

//get user by id

/* export const getOneUser = async (req, res) => {
    const id = req.params.id;
    const product = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  };
   */
