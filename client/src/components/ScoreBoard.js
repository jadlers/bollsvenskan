import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const createRowData = (name, matches, wins, losses) => {
  return {
    name,
    matches,
    wins,
    losses,
  };
};

const mockTableData = [
  createRowData("Dennis", 8, 5, 3),
  createRowData("Wille", 8, 5, 3),
  createRowData("Max", 8, 5, 3),
  createRowData("Simon", 8, 5, 3),
  createRowData("Felix", 8, 4, 4),
  createRowData("Jacob", 8, 4, 4),
  createRowData("Erik", 8, 3, 5),
  createRowData("Teo", 8, 3, 5),
  createRowData("Linus", 8, 3, 5),
];

const ScoreBoard = () => {
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
        {mockTableData.map(row => (
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
