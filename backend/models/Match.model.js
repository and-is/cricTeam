import Database from "../config/dbconfig.js";
import dotenv from "dotenv";
import { connection } from "../server.js";

dotenv.config();

class Match {
  constructor() {}

  async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Matches (
        MatchID INT PRIMARY KEY AUTO_INCREMENT,
        Date DATE,
        Venue VARCHAR(50),
        Team1ID INT,
        Team2ID INT,
        WinnerID INT,
        FOREIGN KEY (Team1ID) REFERENCES Teams(TeamID),
        FOREIGN KEY (Team2ID) REFERENCES Teams(TeamID),
        FOREIGN KEY (WinnerID) REFERENCES Teams(TeamID)
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

  async insertTable(date, venue, team1Id, team2Id, winnerId) {
    const insertTableQUery = `
    INSERT INTO Matches (Date, Venue, Team1ID, Team2ID, WinnerID)
    VALUES (?, ?, ?, ?, ?);
    `;
    connection.query(
      insertTableQUery,
      [date, venue, team1Id, team2Id, winnerId],
      (error, results, fields) => {
        if (error) {
          console.error("Error inserting data ", error);
          return;
        }
        console.log("Data inserted successfully ", results);
      }
    );
  }

  async updateTable(matchId, date, venue, team1Id, team2Id, winnerId) {
    const updateTableQuery = `
    UPDATE Matches
        SET Date = ?, Venue = ?, Team1ID = ?, Team2ID = ?, WinnerID = ?
        WHERE MatchID = ?;
    `;
    connection.query(
      updateTableQuery,
      [date, venue, team1Id, team2Id, winnerId, matchId],
      (error, results, fields) => {
        if (error) {
          console.error("Error updating data ", error);
          return;
        }
        console.log("Data updated successfully ", results);
      }
    );
  }

  async deleteEntries(matchId) {
    const deleteQuery = ` DELETE FROM Matches WHERE MatchID = ?;`;

    connection.query(deleteQuery, [matchId], (error, results, fields) => {
      if (error) {
        console.error("Error deleting data ", error);
        return;
      }
      console.log("Data deleted successfully. ", results);
    });
  }

  async viewEntries() {
    const viewQuery = `
    SELECT 
        Matches.MatchID,
        Matches.Date,
        Matches.Venue,
        T1.TeamName as Team1Name,
        T2.TeamName as Team2Name,
        W.TeamName as WinnerTeamName
      FROM Matches
      JOIN Teams T1 ON Matches.Team1ID = T1.TeamID
      JOIN Teams T2 ON Matches.Team2ID = T2.TeamID
      JOIN Teams W ON Matches.WinnerID = W.TeamID;
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

export default Match;
