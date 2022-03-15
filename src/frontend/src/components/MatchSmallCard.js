import { Link } from "react-router-dom";
import "./MatchSmallCard.scss";

export const MatchSmallCard = (props) => {
  const { match, teamName } = props;
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const isMatchWon = teamName === match.matchWinner;
  return (
    <div
      className={
        isMatchWon ? "MatchSmallCard won-card" : "MatchSmallCard lost-card"
      }
    >
      <h3>
        vs&nbsp;
        <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link>
      </h3>
      <p className="match-result">
        {match.matchWinner} won by {match.resultMargin} {match.result}
      </p>
    </div>
  );
};
