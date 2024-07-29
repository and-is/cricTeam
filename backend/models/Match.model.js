import Database from "../config/dbconfig.js";
import dotenv from "dotenv";

dotenv.config();

class Match {
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

    connection.end((err) => {
      if (err) {
        console.error("Error ending connection:", err.message);
      } else {
        console.log("Connection ended successfully.");
      }
    });
  }

  async insertTable(date, venue, team1Id, team2Id, winnerId) {
    const connection = await this.db.connect();
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

    connection.end((err) => {
      if (err) {
        console.error("Error ending connection", err.message);
      } else {
        console.log("Connection ended successfully.");
      }
    });
  }

  async updateTable(matchId, date, venue, team1Id, team2Id, winnerId) {
    const connection = await this.db.connect();
    const updateTableQuery = `
    UPDATE Matches
        SET Date = ?, Venue = ?, Team1ID = ?, Team2ID = ?, WinnerID = ?
        WHERE MatchID = ?;
    `;
    connection.query(
      updateTableQuery,
      [date, team1Id, team2Id, winnerId, matchId],
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

  async deleteEntries(matchId) {
    const connection = await this.db.connect();
    const deleteQuery = ` DELETE FROM Matches WHERE MatchID = ?;`;

    connection.query(deleteQuery, [matchId], (error, results, fields) => {
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
}

export default Match;
