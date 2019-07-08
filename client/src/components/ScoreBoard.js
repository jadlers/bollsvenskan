import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const getAllPlayers = matches => {
  const players = new Set();
  matches.forEach(match => {
    match.teams.forEach(team => {
      team.forEach(player => players.add(player));
    });
  });
  return players;
};

const createTableRowForPlayer = (name, matches) => {
  let losses = 0;
  let wins = 0;
  matches.forEach(match => {
    if (match.teams[match.winner].includes(name)) {
      wins++;
    } else if (match.teams.flat().includes(name)) {
      losses++;
    }
  });
  return { name, matches: wins + losses, wins, losses };
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

const ScoreBoard = ({ matches }) => {
  const scores = [];
  const players = getAllPlayers(matches);

  players.forEach(player =>
    scores.push(createTableRowForPlayer(player, matches))
  );
  scores.sort(scoreSorter);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right" size="small">
            M
          </TableCell>
          <TableCell align="right" size="small">
            W
          </TableCell>
          <TableCell align="right" size="small">
            L
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scores.map(row => (
          <TableRow key={row.name} hover>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
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
  );
};

export default ScoreBoard;
