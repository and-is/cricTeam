import { useState, useEffect } from "react";
import { fetchTeams, createTeam, updateTeam, deleteTeam } from "../api/api";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: "", coach: "" });

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetchTeams();
      //  console.log(response.data);
      setTeams(response.data);
    };
    getTeams();
  }, [teams]);

  const handleCreateTeam = async () => {
    try {
      const response = await createTeam(newTeam);
      setTeams([...teams, response.data]);
      setNewTeam({ name: "", coach: "" });
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleUpdateTeam = async (id, updatedTeam) => {
    try {
      await updateTeam(id, updatedTeam);
      setTeams(
        teams.map((team) =>
          team.id === id ? { ...team, ...updatedTeam } : team
        )
      );
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      console.log(id);
      await deleteTeam(id);
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Teams</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Team Name"
          className="border p-2 mr-2"
          value={newTeam.name}
          onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Coach"
          className="border p-2 mr-2"
          value={newTeam.coach}
          onChange={(e) => setNewTeam({ ...newTeam, coach: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleCreateTeam}
        >
          Add Team
        </button>
      </div>
      <ul>
        {teams.map((team) => (
          <li key={team.TeamId} className="mb-2">
            {team.TeamName} ({team.Coach})
            <button
              className="bg-green-500 text-white p-2 ml-2"
              onClick={() =>
                handleUpdateTeam(team.TeamId, {
                  name: team.TeamName,
                  coach: team.Coach,
                })
              }
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 ml-2"
              onClick={() => handleDeleteTeam(team.TeamId)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
