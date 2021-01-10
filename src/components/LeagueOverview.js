import React from "react";

import EloGraph from "./EloGraph";
import MatchesList from "./MatchesList";
import ScoreBoard from "./ScoreBoard";
import FirstBloodStats from "./FirstBloodStats";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { playerIdsInMatches } from "../util";

function LeagueOverview({ matches, players, leagueId, season }) {
  // Wait for both matches and players to be fetched
  const loading = matches.length === 0 || players.length === 0;

  leagueId = parseInt(leagueId);
  season = parseInt(season);

  if (isNaN(season) && !isNaN(leagueId)) {
    console.log("Filetering ONLY on league");
    matches = matches.filter((m) => m.leagueId === leagueId);
  } else if (!isNaN(season)) {
    matches = matches.filter(
      (m) => m.leagueId === leagueId && m.season === season
    );
  }

  // Filter players to only include the players which have played
  const includedPlayerIds = playerIdsInMatches(matches);
  const includedPlayers = players.filter((player) =>
    includedPlayerIds.includes(player.id)
  );

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
  ) : matches.length === 0 ? (
    <p className="text-center text-2xl text-nord-5">
      Inga matcher spelade i denna säsong ännu.
    </p>
  ) : (
    <div className="flex flex-col justify-between space-y-4">
      <ScoreBoard matches={matches} players={includedPlayers} />

      <div className="bg-nord-1 p-2 rounded text-nord-5 shadow">
        <EloGraph matches={matches} players={includedPlayers} season={season} />
      </div>
      <FirstBloodStats players={includedPlayers} matches={matches} />
      <MatchesList matches={matches} />
    </div>
  );
}

export default LeagueOverview;
