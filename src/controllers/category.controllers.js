import { Category } from "../models/sql_models/category.model.js";

export const getCategories = async (req, res) => {
  const products = await Category.findAll();
  res.json(products);
};
export const getOneCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({
    where: {
      id_category: id,
    },
  });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(product);
}

export const addCategory = async (req, res) => {
  const data = req.body;


  try {
    const category = await Category.create({
      name: data.data,
    });

    return res.json(category);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const deleteOneCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Category not found" });
  }
  try {
    await Category.destroy({
      where: { id_category: id },
    });

    res.status(204).json({ message: "Successfully deleted the category" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

