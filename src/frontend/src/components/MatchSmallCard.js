export const MatchSmallCard = (props) => {
  const { match } = props;
  return (
    <div className="MatchSmallCard">
      <p>{`${match.team1} vs ${match.team2}`}</p>
    </div>
  );
};
