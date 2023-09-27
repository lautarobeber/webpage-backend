import Product from "../models/product.mode.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const addProducts = async (req, res) => {
  console.log(req.body);
  try {
    const { name, category, price, desc, stock } = req.body;

    const newProduct = new Product({
      name,
      category,
      price,
      desc,

      stock,
    });

    if (req.file) {
      const { filename } = req.file;
      newProduct.setImgUrl(filename);
    }

    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const updateProducts = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const deleteProducts = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  return res.sendStatus(204);
};
