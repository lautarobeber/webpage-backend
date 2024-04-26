//arranca la app
import app from "./app.js";
import { sequelize } from "./db.js";
import dotenv from 'dotenv'


import './models/sql_models/index.models.js';

dotenv.config();

const PORT = process.env.PORT || 4000;




const dbMysql = async () =>{
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection MYSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect MYSQL to the database:", error);
  }
  
}

dbMysql()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
