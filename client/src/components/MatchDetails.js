import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
    "är sämst",
    "hade en dålig dag",
    "har tappat det fullständigt",
    "fokuserade inte tillräckligt",
    "skyllde på lagg",
  ];

  const randomMock =
    mocks[Math.floor(Math.random() * Math.floor(mocks.length))];

  return (
    <p>
      <b>{player.name}</b> {`${randomMock} och dog first blood`}
    </p>
  );
}

function MatchDetails(props) {
  const { match } = props;

  return (
    <div
      style={{
        padding: "5px",
        paddingBottom: "10px",
        marginBottom: "10px",
        borderBottom: "1px solid black",
      }}
    >
      <h1>Match {props.no}</h1>
      <a
        href={`https://www.opendota.com/matches/${match.dotaMatchId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Dota match id {match.dotaMatchId}
      </a>
      <FirstBloodHighlight
        player={match.teams.flat().find((p) => p.id === match.diedFirstBlood)}
      />
      {match.teams.map((team, idx) => {
        return (
          <div key={`${props.no}-team${idx}`}>
            <h4>
              Lag {idx + 1} - {idx === match.winner ? "Vinst" : "Förlust"}
            </h4>
            <PlayerMatchStatsTable teamStats={team} />
          </div>
        );
      })}
    </div>
  );
}

export default MatchDetails;
