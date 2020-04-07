import React from "react";

import MatchDetails from "./MatchDetails";

function MatchesList(props) {
  const matches = props.matches;

  return (
    <>
      {matches.map((m, idx) => (
        <MatchDetails key={m.matchId} no={matches.length - idx} match={m} />
      ))}
    </>
  );
}

export default MatchesList;
