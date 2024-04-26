
import Sequelize from "sequelize";




export const sequelize = new Sequelize("test", "root", "", {
  host: process.env.APP_HOST,
  dialect: "mysql",
});
/* 
export const connectMySQL = async () => {
  try {
    await sequelize.authenticate( );
    await sequelize.sync({});
    console.log("Connection MYSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect MYSQL to the database:", error);
  }
};
 */