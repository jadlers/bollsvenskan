import React from "react";

import MatchDetails from "./MatchDetails";

function MatchesList(props) {
  const matches = props.matches;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[...matches].reverse().map((m, idx) => (
        <MatchDetails key={m.matchId} no={matches.length - idx} match={m} />
      ))}
    </div>
  );
}

export default MatchesList;
