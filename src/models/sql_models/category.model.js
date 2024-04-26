import { sequelize } from "../../db.js";
import { DataTypes } from "sequelize";


export const Category = sequelize.define('Category', {
   
    id_category: {
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true ,
    unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    timestamps: false
  });

 
;  