import { Link } from "react-router-dom";

export const MatchSmallCard = (props) => {
  const { match, teamName } = props;
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  return (
    <div className="MatchSmallCard">
      <h3>
        vs&nbsp;
        <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link>
      </h3>
      <p>
        {match.matchWinner} won by {match.resultMargin} {match.result}
      </p>
    </div>
  );
};
