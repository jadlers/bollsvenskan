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

export function FirstBloodHighlight({ mock, praise, died, claimed }) {
  if (!Array.isArray(mock)) {
    mock = mock.split("<name>");
  }
  if (!Array.isArray(praise)) {
    praise = praise.split("<name>");
  }

  return (
    <p>
      {mock[0]}
      <span className="font-bold">{died ? died.name : "???"}</span>
      {mock[1]}
      {" och dog first blood. "}
      {claimed ? (
        <>
          {praise[0]}
          <span className="font-bold">{claimed.name}</span>
          {praise[1]}
        </>
      ) : (
        ""
      )}
    </p>
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
          died={match.teams.flat().find((p) => p.id === match.diedFirstBlood)}
          claimed={match.teams
            .flat()
            .find((p) => p.id === match.claimedFirstBlood)}
          mock={match.firstBloodMock}
          praise={match.firstBloodPraise}
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
