require("dotenv").config();
const mysql = require("mysql2/promise");


async function createConnection() {
  try{
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root', 
      database: process.env.DB_NAME || 'sistema-de-practicas',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  
    return connection;
  }catch{
    console.log('error en base de datos')
  }
}

module.exports = createConnection;
