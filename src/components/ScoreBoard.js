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
  const playerIdSet = new Set();
  let players = [];
  matches.forEach((match) => {
    match.teams.forEach((team) => {
      team.forEach((player) => {
        if (!playerIdSet.has(player.id)) {
          players.push({ id: player.id, name: player.name });
        }
        playerIdSet.add(player.id);
      });
    });
  });
  return players;
};

const createTableRowForPlayer = (player, eloRating, matches) => {
  let losses = 0;
  let wins = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;
  let firstBloodsDied = 0;

  matches.forEach((match) => {
    let stats;
    if (match.teams[match.winner].map((p) => p.name).includes(player.name)) {
      wins++;
      stats = match.teams.flat().find((p) => p.name === player.name).stats;
    } else if (
      match.teams
        .flat()
        .map((p) => p.name)
        .includes(player.name)
    ) {
      losses++;
      stats = match.teams.flat().find((p) => p.name === player.name).stats;
    }

    if (match.diedFirstBlood === player.id) {
      firstBloodsDied++;
    }

    if (stats) {
      kills += stats.kills;
      deaths += stats.deaths;
      assists += stats.assists;
    }
  });

  const numMatches = wins + losses;

  return {
    id: player.id,
    name: player.name,
    eloRating,
    awards: [],
    matches: numMatches,
    wins,
    losses,
    winRatio: ((wins / numMatches) * 100).toFixed(0),
    firstBloodsDied,
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
          {/* For awards, no text needed*/}
          <TableCell size="small" padding="none"></TableCell>
          <TableCell>Namn</TableCell>
          <TableCell size="small">ELO</TableCell>
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
            <TableCell padding="none">
              {row.awards.map((award) => (
                <span
                  key={`${row.id}-${award.label}`}
                  role="img"
                  aria-label={award.label}
                >
                  {award.emoji}
                </span>
              ))}
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell size="small">{row.eloRating}</TableCell>
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

const ScoreBoard = ({ matches, players, style }) => {
  let scores = [];
  const playersWithMatches = getAllPlayers(matches);

  playersWithMatches.forEach((player) => {
    const currPlayerElo = players.find((p) => p.id === player.id).eloRating;
    scores.push(createTableRowForPlayer(player, currPlayerElo, matches));
  });

  // Sort all players on win ratio
  scores.sort((a, b) => b.winRatio - a.winRatio);

  // Add skull award player(s) who died the most
  const maxFirstBloods = Math.max(
    ...scores.map((player) => player.firstBloodsDied)
  );
  scores.map((elem) => {
    if (elem.firstBloodsDied === maxFirstBloods) {
      elem.awards = [...elem.awards, { emoji: "💀", label: "Skull" }];
    }
    return elem;
  });

  // Players have a calibrated win ratio after 10 games. Split and show in
  // different tables
  let calibrated = scores.filter((player) => player.matches >= 10);
  let uncalibrated = scores.filter((player) => player.matches < 10);
  uncalibrated = uncalibrated.sort((a, b) => b.matches - a.matches); // Sort on number of matches

  // Add medals to top three
  const medals = [
    { emoji: "🥇", label: "1st place medal" },
    { emoji: "🥈", label: "2nd place medal" },
    { emoji: "🥉", label: "3rd place medal" },
  ];
  calibrated = calibrated.map((elem, idx) =>
    idx < medals.length
      ? { ...elem, awards: [...elem.awards, medals[idx]] }
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
