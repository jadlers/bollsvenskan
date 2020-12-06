import React from "react";

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
    <table className="w-full tabular-nums text-right">
      <thead className="text-nord-5 text-right font-semibold">
        <tr>
          {/* For awards, no text needed*/}
          <td className="p-2" />
          <td className="p-2 text-left">Namn</td>
          <td className="p-2">ELO</td>
          <td className="p-2">Genomsnittlig K/D/A</td>
          <td className="p-2">FP</td>
          <td className="p-2">Matcher</td>
          <td className="p-2">Vinstandel</td>
          <td className="p-2">Vinster</td>
          <td className="p-2">Förluster</td>
        </tr>
      </thead>
      <tbody className="text-nord-4 divide-y-2 divide-nord-3">
        {scoreRows.map((row) => (
          <tr key={row.name} className="hover:bg-nord-2">
            <td className="p-2 text-left">
              {row.awards.map((award) => (
                <span
                  key={`${row.id}-${award.label}`}
                  role="img"
                  aria-label={award.label}
                >
                  {award.emoji}
                </span>
              ))}
            </td>
            <td className="p-2 text-left">{row.name}</td>
            <td className="p-2">{row.eloRating}</td>
            <td className="p-2">{`${row.average.kills} / ${row.average.deaths} / ${row.average.assists}`}</td>
            <td className="p-2">{row.average.fantasyPoints}</td>
            <td className="p-2">{row.matches}</td>
            <td className="p-2">{`${row.winRatio}%`}</td>
            <td className="p-2">{row.wins}</td>
            <td className="p-2">{row.losses}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
      elem.awards = [...elem.awards, { emoji: "🔫", label: "Gun" }];
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
    <div className="bg-nord-1 p-2 rounded text-nord-5 overflow-x-auto">
      <ScoreTable scoreRows={calibrated} style={{ marginBottom: "1em" }} />
      {uncalibrated.length === 0 ? (
        ""
      ) : (
        <>
          <h2 className="text-center my-4">Okalibrerade spelare:</h2>
          <ScoreTable scoreRows={uncalibrated} style={style} />
        </>
      )}
    </div>
  );
};

export default ScoreBoard;
