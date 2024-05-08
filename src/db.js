
import Sequelize from "sequelize";


const userDB = process.env.USER_DB
const nameDB = process.env.NAME_DB

export const sequelize = new Sequelize(nameDB, userDB , "", {
  host: process.env.HOST_DB,
  dialect: "mysql",
});
