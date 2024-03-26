const mysql = require("mysql");
const mongoose = require("mongoose");

class connectionDatabase {
  async mysqlConnection() {
    try {
      const connection = mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASS,
        database: process.env.SQL_DB,
      });

      connection.connect();
      console.log("Connected to MySQL Database...");
      return connection;
    } catch (error) {
      console.error(error);
    }
  }

  async connectToMongoDB() {
    try {
      const uri = process.env.MONGO_URI;
      mongoose.set("strictQuery", true);
      mongoose.connect(uri);
      console.log("Connection Database Successful...");
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new connectionDatabase();
