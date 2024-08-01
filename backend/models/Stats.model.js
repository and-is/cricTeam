import Database from "../config/dbconfig.js";
import dotenv from "dotenv";
import { connection } from "../server.js";

dotenv.config();

class PlayerStatistics {
  constructor() {}

  async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS PlayerStatistics (
        StatID INT PRIMARY KEY AUTO_INCREMENT,
        PlayerID INT,
        MatchID INT,
        Runs INT,
        Wickets INT,
        Catches INT,
        FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
        FOREIGN KEY (MatchID) REFERENCES Matches(MatchID)
      );
    `;

    connection.query(createTableQuery, (error, results, fields) => {
      if (error) {
        console.error("Error creating table:", error);
        return;
      }
      console.log("Table created successfully:", results);
    });
  }

  async insertTable(playerId, matchId, runs, wickets, catches) {
    const insertTableQuery = `
      INSERT INTO PlayerStatistics (PlayerID, MatchID, Runs, Wickets, Catches)
      VALUES (?, ?, ?, ?, ?);
    `;
    connection.query(
      insertTableQuery,
      [playerId, matchId, runs, wickets, catches],
      (error, results, fields) => {
        if (error) {
          console.error("Error inserting data ", error);
          return;
        }
        console.log("Data inserted successfully ", results);
      }
    );
  }

  async updateTable(statId, playerId, matchId, runs, wickets, catches) {
    const updateTableQuery = `
      UPDATE PlayerStatistics
      SET PlayerID = ?, MatchID = ?, Runs = ?, Wickets = ?, Catches = ?
      WHERE StatID = ?;
    `;
    connection.query(
      updateTableQuery,
      [playerId, matchId, runs, wickets, catches, statId],
      (error, results, fields) => {
        if (error) {
          console.error("Error updating data ", error);
          return;
        }
        console.log("Data updated successfully ", results);
      }
    );
  }

  async deleteEntries(statId) {
    const deleteQuery = `DELETE FROM PlayerStatistics WHERE StatID = ?;`;

    connection.query(deleteQuery, [statId], (error, results, fields) => {
      if (error) {
        console.error("Error deleting data ", error);
        return;
      }
      console.log("Data deleted successfully. ", results);
    });
  }

  async viewEntries() {
    const viewQuery = `
    SELECT p.Name, m.Venue, s.Runs, s.Wickets, s.Catches
    FROM PlayerStatistics s
    JOIN Players p ON s.PlayerID = p.PlayerID
    JOIN Matches m ON s.MatchID = m.MatchID;
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

export default PlayerStatistics;
