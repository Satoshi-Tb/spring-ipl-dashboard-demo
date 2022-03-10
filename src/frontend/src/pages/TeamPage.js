import { useEffect, useState } from "react";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";

export const TeamPage = () => {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        "http://localhost:8080/team/Mumbai%20Indians"
      );
      const data = await response.json();
      console.log(data);
      setTeam(data);
    };
    fetchMatches();
  }, []);

  return (
    <div className="TeamPage">
      {team === null ? (
        <p>Loading</p>
      ) : (
        <>
          <h1>{team.teamName}</h1>
          <MatchDetailCard match={team.matchs[0]} />
          {team.matchs.map((m) => (
            <MatchSmallCard key={m.id} match={m} />
          ))}
        </>
      )}
    </div>
  );
};
