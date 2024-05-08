  import { sequelize } from "../../db.js";
import { DataTypes } from "sequelize";
/* import {User} from "./users.model.js";
import {Order_Product} from "./order_product.model.js"; */

const Order = sequelize.define(
  "Order",
  {
    id_order: {
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    unique: true,
    },
    
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Esto establece el valor predeterminado como la fecha y hora actual
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    depto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    user_surname: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  },
  {
    timestamps: false
  }
);


/* Order.hasMany(Order_Product, {foreignKey: 'id_order'})

Order_Product.belongsTo(Order, {foreignKey : 'id_order'})*/
export default Order; 
 