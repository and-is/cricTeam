import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
    connection.connect((e) => {
      if (e) {
        console.error("Error connecting", e.message);
      } else {
        console.log("Connected Successfully");
      }
    });
  } catch (error) {
    console.error("Error connecting", error.message);
  }
};

export default connectDB;
