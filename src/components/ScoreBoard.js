import React from "react";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const createTableRowForPlayer = (player, matches) => {
  let losses = 0;
  let wins = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;
  let firstBloodsDied = 0;
  let firstBloodsClaimed = 0;
  let totFantasyPoints = 0;

  matches.forEach((match) => {
    let stats;
    if (match.teams[match.winner].map((p) => p.id).includes(player.id)) {
      wins++;
      stats = match.teams.flat().find((p) => p.id === player.id).stats;
    } else if (
      match.teams
        .flat()
        .map((p) => p.id)
        .includes(player.id)
    ) {
      losses++;
      stats = match.teams.flat().find((p) => p.id === player.id).stats;
    }

    if (match.diedFirstBlood === player.id) {
      firstBloodsDied++;
    }
    if (match.claimedFirstBlood === player.id) {
      firstBloodsClaimed++;
    }

    if (stats) {
      kills += stats.kills;
      deaths += stats.deaths;
      assists += stats.assists;
      totFantasyPoints += stats.fantasy_points;
    }
  });

  const numMatches = wins + losses;
  const avgFantasyPoints = totFantasyPoints / numMatches || 0;

  return {
    id: player.id,
    name: player.username,
    eloRating: player.eloRating,
    awards: [],
    matches: numMatches,
    wins,
    losses,
    winRatio: ((wins / numMatches) * 100).toFixed(0),
    firstBloodsDied,
    firstBloodsClaimed,
    average: {
      kills: (kills / numMatches).toFixed(1),
      deaths: (deaths / numMatches).toFixed(1),
      assists: (assists / numMatches).toFixed(1),
      fantasyPoints: avgFantasyPoints.toFixed(2),
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
            FP
          </TableCell>
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
              {row.average.fantasyPoints}
            </TableCell>
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
  const scores = players.map((player) =>
    createTableRowForPlayer(player, matches)
  );

  // Sort all players on win ratio
  scores.sort((a, b) => b.winRatio - a.winRatio);

  // Add skull award player(s) who died the most
  const maxFirstBloods = Math.max(
    ...scores.map((player) => player.firstBloodsDied)
  );
  const maxFirstBloodsClaimed = Math.max(
    ...scores.map((player) => player.firstBloodsClaimed)
  );
  scores.map((elem) => {
    if (elem.firstBloodsDied === maxFirstBloods) {
      elem.awards = [...elem.awards, { emoji: "💀", label: "Skull" }];
    }
    if (elem.firstBloodsClaimed === maxFirstBloodsClaimed) {
      elem.awards = [...elem.awards, { emoji: "🔫", label: "Sword" }];
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
