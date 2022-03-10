import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";

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
        <h1>Team not found</h1>
      ) : (
        <>
          <h1>{team.teamName}</h1>
          <MatchDetailCard teamName={teamName} match={team.matchs[0]} />
          {team.matchs.map((m) => (
            <MatchSmallCard key={m.id} teamName={teamName} match={m} />
          ))}
        </>
      )}
    </div>
  );
};
