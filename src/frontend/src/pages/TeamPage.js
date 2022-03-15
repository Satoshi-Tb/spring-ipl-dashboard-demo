import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";

import "./TeamPage.scss";

export const TeamPage = () => {
  const [team, setTeam] = useState(null);
  let { teamName } = useParams();
  teamName = teamName ?? "Mumbai Indians"; //TODO 暫定デフォルト値設定

  useEffect(() => {
    console.log("fetch: " + teamName);
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:8080/team/${teamName}`);
        const data = await response.json();
        console.log(data);
        setTeam(data);
      } catch (error) {
        console.log(error);
        alert("fetch error! Team name is " + teamName);
      }
    };
    fetchMatches();
  }, [teamName]);

  return (
    <div className="TeamPage">
      {team === null || !team.teamName ? (
        <p className="team-name">Team not found</p>
      ) : (
        <>
          <div className="team-name-section">
            <p className="team-name">{team.teamName}</p>
          </div>
          <div className="win-loss-section">Wins / Losses</div>
          <div className="match-detail-section">
            <h3>Latest Matches</h3>
            <MatchDetailCard teamName={teamName} match={team.matchs[0]} />
          </div>
          {team.matchs
            .filter((e, i) => i !== 0)
            .map((m) => (
              <MatchSmallCard key={m.id} teamName={teamName} match={m} />
            ))}
          <div className="more-link">
            <a href="#">More &gt;</a>
          </div>
        </>
      )}
    </div>
  );
};
