import Team from "../models/Team.model.js";

const teams = new Team();

export const createTeam = async (req, res) => {
  const { name, coach } = req.body;
  try {
    await teams.createTable();
    await teams.insertTable(name, coach);
    res.status(201).send("Team created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, coach } = req.body;
  try {
    await teams.updateTable(id, name, coach);
    res.send("Team updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    await teams.deleteEntries(id);
    res.send("Team deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const viewTeam = async (req, res) => {};
