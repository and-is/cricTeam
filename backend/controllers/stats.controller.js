import Stats from "../models/Stats.model.js";

const stats = new Stats();

export const createStat = async (req, res) => {
  const { playerId, matchId, runs, wickets, catches } = req.body;
  try {
    await stats.createTable();
    await stats.insertTable(playerId, matchId, runs, wickets, catches);
    res.status(201).send("Stats created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateStat = async (req, res) => {
  const { id } = req.params;
  const { playerId, matchId, runs, wickets, catches } = req.body;
  try {
    await stats.updateTable(id, playerId, matchId, runs, wickets, catches);
    res.send("Stats updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteStat = async (req, res) => {
  const { id } = req.params;
  try {
    await stats.deleteEntries(id);
    res.send("Stats deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const viewStat = async (req, res) => {
  try {
    const results = await teams.viewEntries();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
