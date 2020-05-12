import React from "react";

import MatchDetails from "./MatchDetails";

function MatchesList(props) {
  const matches = props.matches;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {matches.map((m, idx) => (
        <MatchDetails key={m.matchId} no={idx + 1} match={m} />
      ))}
    </div>
  );
}

export default MatchesList;
