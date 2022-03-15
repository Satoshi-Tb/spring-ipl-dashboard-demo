import { Link } from "react-router-dom";
import "./YearSelector.scss";

export const YearSelector = (props) => {
  const { teamName } = props;
  //TODO 環境変数から取得
  const startYear = process.env.REACT_APP_DATA_START_YEAR;
  const endYear = process.env.REACT_APP_DATA_END_YEAR;

  const years = [...Array(2020 - 2008 + 1).keys()].map((e) => 2020 - e);
  console.log(years);

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
