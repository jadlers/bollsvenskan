import React from "react";

import EloGraph from "./EloGraph";
import MatchesList from "./MatchesList";
import ScoreBoard from "./ScoreBoard";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

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
      <Card raised style={{ marginBottom: "2em" }}>
        <CardContent>
          <EloGraph matches={matches} players={players} />
        </CardContent>
      </Card>
      <MatchesList matches={matches} />
    </>
  );
}

export default LeagueOverview;
