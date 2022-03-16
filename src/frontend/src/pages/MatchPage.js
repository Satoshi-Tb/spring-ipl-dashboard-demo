import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { Spinner } from "../components/Spinner";
import { YearSelector } from "../components/YearSelector";
import "./MatchPage.scss";

export const MatchPage = () => {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const { teamName, year } = useParams();
  console.log("teamname: " + teamName + ", year: " + year);

  useEffect(() => {
    setLoading(true);
    console.log("fetch: " + teamName);
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/team/${teamName}/matches?year=${year}`
        );
        const data = await response.json();
        console.log(data);
        setMatches(data);
      } catch (error) {
        console.log(error);
        alert("fetch error! teamName: " + teamName + ", year:" + year);
      }
    };
    fetchMatches();
    setLoading(false);
  }, [teamName, year]);

  return (
    <div className="MatchPage">
      <div className="year-selector">
        <YearSelector teamName={teamName} />
      </div>
      <div>
        {loading ? (
          <Spinner />
        ) : matches === null || matches.length === 0 ? (
          <p>No matches found in {year}</p>
        ) : (
          <>
            <h1 className="page-heading">
              {teamName} matches in {year}
            </h1>
            {matches.map((m) => (
              <MatchDetailCard key={m.id} teamName={teamName} match={m} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
