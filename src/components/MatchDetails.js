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
      <Table size="small">
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
            <TableRow key={player.name} hover>
              <TableCell>{player.name}</TableCell>
              <TableCell alight="right" size="small">
                {player.stats.kills || 0}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.deaths || 0}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.assists || 0}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.fantasy_points || 0}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.observers_placed || 0}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.observers_destroyed || 0}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.sentries_placed || 0}
              </TableCell>
              <TableCell alight="right" size="small">
                {player.stats.sentries_destroyed || 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function FirstBloodHighlight({ player, claimed, dotaMatchId }) {
  const mocks = [
    "<name> var sämst",
    "<name> hade en dålig dag",
    "<name> fokuserade inte tillräckligt",
    "<name> tappade det fullständigt",
    "<name> skyllde på lagg",
    "<name> misslyckades med social distansering",
    "<name> blev scammad, köpte en fortune 3 träpickaxe",
    "<name> hittade inte sladden",
    "<name> borde hållt sig till sin egna runjävel",
    "<name> försökte sälja bläck till ravvie",
    "<name> drog inte ut i tid",
    '"OMG, <name> just went in"',
    "<name> spydde på sitt tangentbord",
    "<name> kunde inte dodgea",
    "<name> lyssnade på Pontus",
    "<name> kunde inte fiska, halkade i sjön",
    "<name> hade handikapps-hotkeys",
    "<name> fastnade i kokaingränden",
  ];

  // Insert name between the parts
  const randomMock = mocks[dotaMatchId % mocks.length];
  const parts = randomMock.split("<name>");

  return (
    <Typography>
      {parts[0]}
      <b>{player ? player.name : "???"}</b>
      {parts[1]}
      {" och dog first blood. "}
      {claimed ? <b>{claimed.name}</b> : ""}
      {claimed ? " fick blodet att spillas" : ""}
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
          claimed={match.teams
            .flat()
            .find((p) => p.id === match.claimedFirstBlood)}
          dotaMatchId={match.dotaMatchId}
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
