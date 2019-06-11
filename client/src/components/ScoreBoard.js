import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const createRowData = (name, matches, wins, ties, losses, score) => {
  return {
    name,
    matches,
    wins,
    ties,
    losses,
    score,
  };
};

const mockTableData = [
  createRowData("Alice", 1, 1, 0, 0, 3),
  createRowData("Bob", 1, 0, 0, 1, 0),
  createRowData("Celine", 3, 1, 1, 1, 4),
];

const ScoreBoard = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Matches</TableCell>
          <TableCell align="right">Wins</TableCell>
          <TableCell align="right">Ties</TableCell>
          <TableCell align="right">Losses</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {mockTableData.map(row => (
          <TableRow key={row.name} hover>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.matches}</TableCell>
            <TableCell align="right">{row.wins}</TableCell>
            <TableCell align="right">{row.ties}</TableCell>
            <TableCell align="right">{row.losses}</TableCell>
            <TableCell align="right">{row.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScoreBoard;
