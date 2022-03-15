import { Link } from "react-router-dom";
import "./TeamTile.scss";

export const TeamTile = (props) => {
  const { team } = props;
  return (
    <div className="TeamTile">
      <h1>
        <Link to={`/teams/${team.teamName}`}>{team.teamName}</Link>
      </h1>
    </div>
  );
};
