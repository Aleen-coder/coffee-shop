// backend/db.js
import mysql from "mysql2";
import dotenv from "dotenv"; 
dotenv.config(); // load .env variables
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,       // Provided by Railway
  port: process.env.MYSQLPORT,       // Provided by Railway
  user: process.env.MYSQLUSER,       // Provided by Railway
  password: process.env.MYSQLPASSWORD, // Provided by Railway
  database: process.env.MYSQLDATABASE // Provided by Railway (currently "railway")
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to Railway MySQL database");
  }
});

export default db;
