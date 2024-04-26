  import { sequelize } from "../../db.js";
import { BOOLEAN, DataTypes, INTEGER } from "sequelize";



const Product_Cart = sequelize.define(
  "Product_Cart",
  {
    id_product_cart: {
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    unique: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
  }
);




export default Product_Cart; 
