
import Sequelize from "sequelize";


const userDB = process.env.USER_DB
const nameDB = process.env.NAME_DB
const passwordDB = process.env.PASSWORD_DB
const hostDB = process.env.HOST_DB
const portDB = process.env.PORT_DB

/* export const sequelize = new Sequelize(nameDB, userDB , passwordDB, {
  host: process.env.HOST_DB,
  dialect: "mysql",
});
 */

export const sequelize = new Sequelize(`mysql://root:ZYaQxhYfhcfRiTwBAtwosEhJCvZNjLZt@roundhouse.proxy.rlwy.net:30294/railway`);