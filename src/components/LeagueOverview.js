import React from "react";

import ScoreBoard from "./ScoreBoard";
import MatchesList from "./MatchesList";

import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

function LeagueOverview({ matches, players }) {
  // Wait for both matches and players to be fetched
  const loading = matches.length === 0 || players.length === 0;

  return loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2em",
      }}
    >
      <Fade in={loading} timeout={{ appear: 800 }} unmountOnExit>
        <CircularProgress />
      </Fade>
    </div>
  ) : (
    <>
      <ScoreBoard
        matches={matches}
        players={players}
        style={{ marginBottom: "2em" }}
      />
      <MatchesList
        matches={matches.sort((a, b) =>
          a.dotaMatchId <= b.dotaMatchId ? 1 : -1
        )}
      />
    </>
  );
}

export default LeagueOverview;
