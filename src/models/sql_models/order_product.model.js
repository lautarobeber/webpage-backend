 import { sequelize } from "../../db.js";
import { BOOLEAN, DataTypes, INTEGER } from "sequelize";


export const Order_Product = sequelize.define(
  "Order_Product",
  {
    id_order_product: {
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
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
  }
);






