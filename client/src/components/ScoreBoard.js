import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
    average: {
      kills: (kills / numMatches).toFixed(1),
      deaths: (deaths / numMatches).toFixed(1),
      assists: (assists / numMatches).toFixed(1),
    },
  };
};

const scoreSorter = (a, b) => {
  if (a.wins < b.wins) {
    return 1;
  } else if (a.wins > b.wins) {
    return -1;
  } else {
    return 0;
  }
};

const ScoreBoard = ({ matches, style }) => {
  const scores = [];
  const players = getAllPlayers(matches);

  players.forEach((player) =>
    scores.push(createTableRowForPlayer(player, matches))
  );
  scores.sort(scoreSorter);

  return (
    <Card style={style}>
      <CardContent style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell align="right">Genomsnittlig K/D/A</TableCell>
              <TableCell align="right" size="small">
                Matcher
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
            {scores.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{`${row.average.kills} / ${row.average.deaths} / ${row.average.assists}`}</TableCell>
                <TableCell align="right" size="small">
                  {row.matches}
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
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;
