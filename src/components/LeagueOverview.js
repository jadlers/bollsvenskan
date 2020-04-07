import React from "react";

import ScoreBoard from "./ScoreBoard";
import MatchesList from "./MatchesList";

function LeagueOverview(props) {
  const matches = props.matches;

  return (
    <div>
      <ScoreBoard matches={matches} style={{ marginBottom: "2em" }} />
      <MatchesList
        matches={matches.sort((a, b) =>
          a.dotaMatchId <= b.dotaMatchId ? 1 : -1
        )}
      />
    </div>
  );
}

export default LeagueOverview;
