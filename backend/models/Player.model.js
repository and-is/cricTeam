import dotenv from "dotenv";
dotenv.config();
import { connection } from "../server.js";

import Database from "../config/dbconfig.js";

class Player {
  constructor() {}

  async createTable() {
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
  }

  async insertTable(name, age, teamId, role) {
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
  }

  async updateTable(playerId, name, age, teamId, role) {
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
  }

  async deleteEntries(playerId) {
    const deleteQuery = `DELETE FROM Players WHERE PlayerID = ?;`;

    connection.query(deleteQuery, [playerId], (error, results, fields) => {
      if (error) {
        console.error("Error deleting data ", error);
        return;
      }
      console.log("Data deleted successfully. ", results);
    });
  }

  async viewEntries() {
    const viewQuery = `
    SELECT p.Name, p.Age, p.Role, t.TeamName
    FROM Players p
    JOIN Teams t ON p.TeamID = t.TeamID;
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
    });
  }
}

export default Player;
