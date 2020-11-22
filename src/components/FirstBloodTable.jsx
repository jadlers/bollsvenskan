import React from "react";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

/**
 * Used for number of times a player died *and* claimed firstblood.
 */
function FirstBloodTable({ title, data, displayRow }) {
  return (
    <Card
      style={{
        marginBottom: "2em",
        width: displayRow ? "40%" : "100%",
        minWidth: "300px",
      }}
    >
      <CardContent>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell align="right">Antal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .sort((a, b) => b.amount - a.amount)
              .map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default FirstBloodTable;
