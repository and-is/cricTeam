import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

class Database {
  constructor({ host, username, password, database }) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.database = database;
  }

  async connect() {
    try {
      const connection = await mysql.createConnection({
        host: this.host,
        user: this.username,
        password: this.password,
        database: this.database,
      });
      connection.connect((e) => {
        if (e) {
          console.error("Error connecting", e.message);
        } else {
          console.log("Connected Successfully");
        }
      });
      return connection;
    } catch (error) {
      console.error("Error connecting", error.message);
    }
  }
}

export default Database;
