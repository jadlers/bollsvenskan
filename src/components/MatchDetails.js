import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

function PlayerMatchStatsTable(props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Namn</TableCell>
            <TableCell alight="right" size="small">
              K
            </TableCell>
            <TableCell alight="right" size="small">
              D
            </TableCell>
            <TableCell alight="right" size="small">
              A
            </TableCell>
            <TableCell alight="right" size="small">
              FP
            </TableCell>
            <TableCell alight="right" size="small">
              OP
            </TableCell>
            <TableCell alight="right" size="small">
              OD
            </TableCell>
            <TableCell alight="right" size="small">
              SP
            </TableCell>
            <TableCell alight="right" size="small">
              SD
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.teamStats.map((player) => (
            <TableRow key={player.name}>
              <TableCell>{player.name}</TableCell>
              <TableCell alight="right" size="small">
                {player.stats.kills}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.deaths}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.assists}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.fantasy_points}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.observers_placed}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.observers_destroyed}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.sentries_placed}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.sentries_destroyed}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function FirstBloodHighlight({ player }) {
  const mocks = [
    "var sämst",
    "hade en dålig dag",
    "fokuserade inte tillräckligt",
    "tappade det fullständigt",
    "skyllde på lagg",
  ];

  const randomMock =
    mocks[Math.floor(Math.random() * Math.floor(mocks.length))];

  return (
    <Typography>
      <b>{player.name}</b> {`${randomMock} och dog first blood`}
    </Typography>
  );
}

function MatchDetails(props) {
  const { match } = props;

  const victorySpan = <span style={{ color: "green" }}>Vinst</span>;
  const lossSpan = <span style={{ color: "red" }}>Förlust</span>;

  return (
    <Card raised style={{ marginBottom: "2em" }}>
      <CardHeader title={`Match ${props.no}`} />
      <CardContent>
        <FirstBloodHighlight
          player={match.teams.flat().find((p) => p.id === match.diedFirstBlood)}
        />
        {match.teams.map((team, idx) => {
          return (
            <div key={`${props.no}-team${idx}`}>
              <h4>
                Lag {idx + 1} - {idx === match.winner ? victorySpan : lossSpan}
              </h4>
              <PlayerMatchStatsTable teamStats={team} />
            </div>
          );
        })}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          href={`https://www.opendota.com/matches/${match.dotaMatchId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "auto" }}
        >
          Opendota
        </Button>
      </CardActions>
    </Card>
  );
}

export default MatchDetails;
