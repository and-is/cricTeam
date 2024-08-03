import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
});

export const fetchTeams = () => api.get("/teams");
export const fetchPlayers = () => api.get("/players");
export const fetchMatches = () => api.get("/matches");
export const fetchStats = () => api.get("/stats");

export const createTeam = (team) => api.post("/teams", team);
export const createPlayer = (player) => api.post("/players", player);
export const createMatch = (match) => api.post("/matches", match);
export const createStat = (stat) => api.post("/stats", stat);

export const updateTeam = (id, team) => api.put(`/teams/${id}`, team);
export const updatePlayer = (id, player) => api.put(`/players/${id}`, player);
export const updateMatch = (id, match) => api.put(`/matches/${id}`, match);
export const updateStat = (id, stat) => api.put(`/stats/${id}`, stat);

export const deleteTeam = (id) => api.delete(`/teams/${id}`);
export const deletePlayer = (id) => api.delete(`/players/${id}`);
export const deleteMatch = (id) => api.delete(`/matches/${id}`);
export const deleteStat = (id) => api.delete(`/stats/${id}`);
