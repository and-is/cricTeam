import dotenv from "dotenv";
dotenv.config();

import Database from "../config/dbconfig.js";

class Player {
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

    const createTableQuery = `CREATE TABLE IF NOT EXISTS Players (
        PlayerID INT PRIMARY KEY AUTO_INCREMENT,
        Name VARCHAR(50) NOT NULL,
        Age INT,
        Role VARCHAR(20),
        TeamID INT,
        FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
      );
    `;

    connection.query(createTableQuery, (error, results, fields) => {
      if (error) {
        console.log("Error creating table ", error);
        return;
      }
      console.log("Table creation successful", results);
    });

    connection.end((err) => {
      if (err) {
        console.log("Error ending connection ", err.message);
      } else {
        console.log("Connected ended successfully");
      }
    });
  }

  async insertTable(name, age, teamId, role) {
    const connection = await this.db.connect();
    const insertTableQuery = `
      INSERT INTO Players (Name, Age, TeamID, Role)
      VALUES (?, ?, ?, ?);
    `;
    connection.query(
      insertTableQuery,
      [name, age, teamId, role],
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

  async updateTable(playerId, name, age, teamId, role) {
    const connection = await this.db.connect();
    const updateTableQuery = `
      UPDATE Players
      SET Name = ?, Age = ?, TeamID = ?, Role = ?
      WHERE PlayerID = ?;
    `;
    connection.query(
      updateTableQuery,
      [name, age, teamId, role, playerId],
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

  async deleteEntries(playerId) {
    const connection = await this.db.connect();
    const deleteQuery = `DELETE FROM Players WHERE PlayerID = ?;`;

    connection.query(deleteQuery, [playerId], (error, results, fields) => {
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
    const viewQuery = ``;

    connection.query(viewQuery, (error, results, fields) => {
      if (error) {
        console.error("Error viewing entries ", error);
        return;
      }
      console.log("Viewing entries successful ", results);
    });

    connection.end((err) => {
      if (err) {
        console.error("Error ending connection:", err.message);
      } else {
        console.log("Connection ended successfully.");
      }
    });
  }
}

export default Player;
