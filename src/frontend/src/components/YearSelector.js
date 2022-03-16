import { Link } from "react-router-dom";
import "./YearSelector.scss";

export const YearSelector = (props) => {
  const { teamName } = props;

  const startYear = Number(process.env.REACT_APP_DATA_START_YEAR);
  const endYear = Number(process.env.REACT_APP_DATA_END_YEAR);

  const years = [...Array(endYear - startYear + 1).keys()].map(
    (e) => endYear - e
  );

  return (
    <ol className="YearSelector">
      <h4>Select Year</h4>
      {years.map((year) => (
        <li key={year}>
          <Link key={year} to={`/teams/${teamName}/matches/${year}`}>
            {year}
          </Link>
        </li>
      ))}
    </ol>
  );
};
