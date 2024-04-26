 import { sequelize } from "../../db.js";
import { DataTypes } from "sequelize";


export const Cart = sequelize.define('Cart', {
   
    id_cart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true ,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Esto establece el valor predeterminado como la fecha y hora actual
    }

  }, {
    timestamps: false
  }
  );
  


/* Cart.hasMany(Product_Cart, { foreignKey: 'id_cart' });
Product_Cart.belongsTo(Cart, { foreignKey: "id_cart" }); */
