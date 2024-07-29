import dotenv from "dotenv";
dotenv.config();

import Database from "../config/dbconfig.js";

class Team {
  constructor() {
    this.db = new Database({
      host: "localhost",
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
  }

  async createTable() {
    const connection = await this.db.connect();

    const createTableQuery = `CREATE TABLE IF NOT EXISTS Teams (
      TeamId INT primary key auto_increment,
      TeamName varchar(50) not null,
      coach varchar(50)
    );
    `;

    connection.query(createTableQuery, (error, results, fields) => {
      if (error) {
        console.error("Error creating tables ", error);
        return;
      }
      console.log("Table created successfully", results);
    });

    connection.end((err) => {
      if (err) {
        console.error("Error ending connection: ", err.message);
      } else {
        console.log("Connection ended successfully!");
      }
    });
    return connection;
  }

  async insertTable(name, coach) {
    const connection = await this.db.connect();
    const insertTableQuery = `
      INSERT INTO Teams (TeamName, Coach)
      VALUES (?, ?);
    `;
    connection.query(
      insertTableQuery,
      [name, coach],
      (error, results, fields) => {
        if (error) {
          console.error("Error inserting data ", error);
          return;
        }
        console.log("Data inserted successfully ", results);
      }
    );

    connection.end((err) => {
      if (err) {
        console.error("Error ending connection", err.message);
      } else {
        console.log("Connection ended successfully.");
      }
    });
  }

  async updateTable(teamId, name, coach) {
    const connection = await this.db.connect();
    const updateTableQuery = `
      UPDATE Teams
      SET TeamName = ?, Coach = ?
      WHERE TeamID = ?;
    `;
    connection.query(
      updateTableQuery,
      [name, coach, teamId],
      (error, results, fields) => {
        if (error) {
          console.error("Error updating data ", error);
          return;
        }
        console.log("Data updated successfully ", results);
      }
    );

    connection.end((err) => {
      if (err) {
        console.error("Error ending connection", err.message);
      } else {
        console.log("Connection ended successfully.");
      }
    });
  }

  async deleteEntries(teamId) {
    const connection = await this.db.connect();
    const deleteQuery = `DELETE FROM Teams WHERE TeamID = ?;`;

    connection.query(deleteQuery, [teamId], (error, results, fields) => {
      if (error) {
        console.error("Error deleting data ", error);
        return;
      }
      console.log("Data deleted successfully. ", results);
    });

    connection.end((err) => {
      if (err) {
        console.error("Error ending connection", err.message);
      } else {
        console.log("Connection ended successfully.");
      }
    });
  }

  async viewEntries() {
    const connection = await this.db.connect();
    const viewQuery = `
    SELECT TeamName, Coach
    FROM Teams;
    `;

    return new Promise((resolve, reject) => {
      connection.query(viewQuery, (error, results, fields) => {
        if (error) {
          console.error("Error reading data", error);
          reject(error);
          return;
        }
        resolve(results);
      });

      connection.end((err) => {
        if (err) {
          console.error("Error ending connection", err.message);
        } else {
          console.log("Connection ended successfully.");
        }
      });
    });
  }
}

export default Team;
