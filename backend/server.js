import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import Database from "./config/dbconfig.js";

const PORT = process.env.PORT;

const credentials = {
  host: "localhost",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const db = new Database(credentials);
const connection1 = db.connect();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
