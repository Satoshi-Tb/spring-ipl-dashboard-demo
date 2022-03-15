import { useEffect, useState } from "react";
import { TeamTile } from "../components/TeamTile";
import "./HomePage.scss";

export const HomePage = () => {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="HomePage">
      {teams === null || teams.length === 0 ? (
        <h1>No Team found</h1>
      ) : (
        <>
          <div className="header-section">
            <h1 className="app-name">IPL Dashboard</h1>
          </div>
          <div className="team-grid">
            {teams.map((team) => (
              <TeamTile key={team.id} team={team} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
