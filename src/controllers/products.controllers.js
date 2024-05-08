/* import Product from "../models/product.mode.js"; */
import { Product } from "../models/sql_models/products.model.js";
import { Category } from "../models/sql_models/category.model.js";
import Product_Cart from "../models/sql_models/product_cart.model.js"
import {Cart} from "../models/sql_models/cart.model.js"


export const getProducts = async (req, res) => {
  try{
    const products = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['name'], // Solo recuperar el nombre de las categorías
        
      }],
    })
    res.json(products);
  }catch(e){
    res.status(500).json({message: e.message})
  }
  
};

export const addProducts = async (req, res) => {
  

  try {
    const { name, category, price, desc, sizes } = req.body;
    console.log(name, 'aca')

    const newProduct = await Product.create({
      name: name,
      id_category: parseInt(req.body.category),
      price: parseInt(req.body.price),
      description: desc,
      image_url: req.file ? req.file.filename : null,
      sizes: sizes
    });



    res.json(newProduct);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    where: {
      id_product: id,
    },
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const updateProducts = async (req, res) => {
  const {id} = req.params;
  const {name, category, desc , price, src} = req.body;
  
  try{
    let product = await Product.findByPk(id);

    if (name !== undefined) {
      project.name = name;
    }
    if (category !== undefined) {
      product.id_category = parseInt(category)
    }
    if (desc !== undefined) {
      product.description = desc
    }
    if (price !== undefined){
      product.price = parseFloat(price)
    }
    if (src!==undefined){
      product.image=src
    }
    if (sizes!==undefined){
      product.sizes=sizes
    }


    await product.save()

    res.json(product)
  }catch(e){

  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id_product: id } });
    res.status(204).json({ message: "Successfully deleted the product" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};


export const deleteByCatID = async (req, res) => {
 
  const { id_category} = req.body;
 
  try {
    
    await Product.destroy({ where: { id_category: id_category } });
    res.status(200).json({ message: "Successfully deleted the products" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};


