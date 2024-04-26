 import { sequelize } from "../../db.js";
import { DataTypes } from "sequelize";


export const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    
  },
  {
    timestamps: false,
  }
);

/* User.hasMany(Order, { foreignKey: "id_user", sourceKey: 'email' });
Order.belongsTo(User, {foreignKey: 'id_user', targetKey: 'email'})

User.hasOne(Cart, { foreignKey: "id_user", sourceKey: 'email' });
Cart.belongsTo(User, {foreignKey: 'email', targetKey: 'email' }) */

 