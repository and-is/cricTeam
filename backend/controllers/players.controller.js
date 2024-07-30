import Player from "../models/Player.model.js";

const players = new Player();

export const createPlayer = async (req, res) => {
  const { name, age, teamId, role } = req.body;
  try {
    await players.insertTable(name, age, teamId, role);
    res.status(201).send("Player created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name, age, teamId, role } = req.body;
  try {
    await players.updateTable(id, name, age, teamId, role);
    res.send("Player updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    await players.deleteEntries(id);
    res.send("Player deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const viewPlayer = async (req, res) => {
  try {
    const results = await players.viewEntries();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
