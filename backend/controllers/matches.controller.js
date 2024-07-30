import Matches from "../models/Match.model.js";

const matches = new Matches();

export const createMatch = async (req, res) => {
  const { date, venue, team1Id, team2Id, winnerId } = req.body;
  try {
    await matches.insertTable(date, venue, team1Id, team2Id, winnerId);
    res.status(201).send("Match created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { date, venue, team1Id, team2Id, winnerId } = req.body;
  try {
    await matches.updateTable(id, date, venue, team1Id, team2Id, winnerId);
    res.send("Match updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    await matches.deleteEntries(id);
    res.send("Match deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const viewMatch = async (req, res) => {
  try {
    const results = await matches.viewEntries();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
