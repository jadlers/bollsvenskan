import React from "react";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const getAllPlayers = (matches) => {
  const players = new Set();
  matches.forEach((match) => {
    match.teams.forEach((team) => {
      team.forEach((player) => players.add(player.name));
    });
  });
  return players;
};

const createTableRowForPlayer = (name, matches) => {
  let losses = 0;
  let wins = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;

  matches.forEach((match) => {
    let stats;
    if (match.teams[match.winner].map((p) => p.name).includes(name)) {
      wins++;
      stats = match.teams.flat().find((p) => p.name === name).stats;
    } else if (
      match.teams
        .flat()
        .map((p) => p.name)
        .includes(name)
    ) {
      losses++;
      stats = match.teams.flat().find((p) => p.name === name).stats;
    }

    if (stats) {
      kills += stats.kills;
      deaths += stats.deaths;
      assists += stats.assists;
    }
  });

  const numMatches = wins + losses;

  return {
    name,
    matches: numMatches,
    wins,
    losses,
    winRatio: ((wins / numMatches) * 100).toFixed(0),
    average: {
      kills: (kills / numMatches).toFixed(1),
      deaths: (deaths / numMatches).toFixed(1),
      assists: (assists / numMatches).toFixed(1),
    },
  };
};

const ScoreTable = ({ scoreRows, style }) => {
  return (
    <Table style={style}>
      <TableHead>
        <TableRow>
          <TableCell>Namn</TableCell>
          <TableCell align="right">Genomsnittlig K/D/A</TableCell>
          <TableCell align="right" size="small">
            Matcher
          </TableCell>
          <TableCell align="right" size="small">
            Vinstandel
          </TableCell>
          <TableCell align="right" size="small">
            Vinster
          </TableCell>
          <TableCell align="right" size="small">
            Förluster
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scoreRows.map((row) => (
          <TableRow key={row.name} hover>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{`${row.average.kills} / ${row.average.deaths} / ${row.average.assists}`}</TableCell>
            <TableCell align="right" size="small">
              {row.matches}
            </TableCell>
            <TableCell align="right" size="small">
              {`${row.winRatio}%`}
            </TableCell>
            <TableCell align="right" size="small">
              {row.wins}
            </TableCell>
            <TableCell align="right" size="small">
              {row.losses}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ScoreBoard = ({ matches, style }) => {
  let scores = [];
  const players = getAllPlayers(matches);

  players.forEach((player) =>
    scores.push(createTableRowForPlayer(player, matches))
  );

  // Sort all players on win ratio
  scores.sort((a, b) => b.winRatio - a.winRatio);

  // Players have a calibrated win ratio after 10 games. Split and show in
  // different tables
  let calibrated = scores.filter((player) => player.matches >= 10);
  let uncalibrated = scores.filter((player) => player.matches < 10);
  uncalibrated = uncalibrated.sort((a, b) => b.matches - a.matches); // Sort on number of matches

  // Add medals to top three
  const medals = ["🥇", "🥈", "🥉"];
  calibrated = calibrated.map((elem, idx) =>
    idx < medals.length
      ? { ...elem, name: `${medals[idx]} ${elem.name}` }
      : elem
  );

  return (
    <Card style={style}>
      <CardContent style={{ overflowX: "auto" }}>
        <ScoreTable scoreRows={calibrated} style={{ marginBottom: "1em" }} />
        {uncalibrated.length === 0 ? (
          ""
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Okalibrerade spelare
            </Typography>
            <ScoreTable scoreRows={uncalibrated} style={style} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;
