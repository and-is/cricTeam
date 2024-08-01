import dotenv from "dotenv";
dotenv.config();
import { connection } from "../server.js";

import Database from "../config/dbconfig.js";

class Team {
  constructor() {}

  async createTable() {
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
  }

  async insertTable(name, coach) {
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
  }

  async updateTable(teamId, name, coach) {
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
  }

  async deleteEntries(teamId) {
    const deleteQuery = `DELETE FROM Teams WHERE TeamID = ?;`;

    connection.query(deleteQuery, [teamId], (error, results, fields) => {
      if (error) {
        console.error("Error deleting data ", error);
        return;
      }
      console.log("Data deleted successfully. ", results);
    });
  }

  async viewEntries() {
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
    });
  }
}

export default Team;
