import { useEffect, useState } from "react";
import { TeamTile } from "../components/TeamTile";
import "./HomePage.scss";
import { Spinner } from "../components/Spinner";

export const HomePage = () => {
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAllTeams = async () => {
      try {
        const response = await fetch(`http://localhost:8080/team`);
        const data = await response.json();
        console.log(data);
        setTeams(data);
      } catch (error) {
        console.log(error);
        alert("fetch error!");
      }
    };
    fetchAllTeams();
    setLoading(false);
  }, []);

  return (
    <div className="HomePage">
      <div className="header-section">
        <h1 className="app-name">IPL Dashboard</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : teams === null || teams.length === 0 ? (
        <h1>No Team found</h1>
      ) : (
        <div className="team-grid">
          {teams.map((team) => (
            <TeamTile key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
};
