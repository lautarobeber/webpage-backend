 import { sequelize } from "../../db.js";
import { DataTypes } from "sequelize";
/* import Product_Cart from "./product_cart.model.js";
import {Order_Product} from "./order_product.model.js";
import { Category } from "./category.model.js";
 */
export const Product = sequelize.define('Product', {
   
    id_product: {
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true
      //fk
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
      
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
      
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
      
    },
    sizes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    }

  }, {
    timestamps: false
  });

/*
  Product.hasMany(Product_Cart, { foreignKey: 'id_product' });
  Order_Product.belongsTo(Product, {foreignKey : 'id_product'})
  Product.hasMany(Order_Product, { foreignKey: 'id_product' });
  Product_Cart.belongsTo(Product, { foreignKey: "id_product" });
  Category.hasMany(Product, {foreignKey: 'id_product'});
  Product.belongsTo(Category, {foreignKey: 'id_category'})
  
  
  */