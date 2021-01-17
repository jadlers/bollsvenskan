import React from "react";
import { navigate } from "@reach/router";

const createTableRowForPlayer = (player, matches) => {
  let losses = 0;
  let wins = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;
  let firstBloodsDied = 0;
  let firstBloodsClaimed = 0;
  let totFantasyPoints = 0;
  let fantasyPointGames = 0;

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
      if (stats.fantasy_points > 0) {
        totFantasyPoints += stats.fantasy_points;
        fantasyPointGames++;
      }
    }
  });

  const numMatches = wins + losses;
  const avgFantasyPoints = totFantasyPoints / fantasyPointGames || 0;

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

function ScoreRow({ data }) {
  return (
    <tr className="hover:bg-nord-2">
      <td className="p-2 text-left">
        {data.awards.map((award) => (
          <span
            key={`${data.id}-${award.label}`}
            role="img"
            aria-label={award.label}
          >
            {award.emoji}
          </span>
        ))}
      </td>
      <td
        className="p-2 text-left"
        onClick={() => navigate(`/user/${data.id}`)}
      >
        <a className="cursor-pointer">{data.name}</a>
      </td>
      <td className="p-2">{data.eloRating}</td>
      <td className="p-2">{`${data.average.kills} / ${data.average.deaths} / ${data.average.assists}`}</td>
      <td className="p-2">{data.average.fantasyPoints}</td>
      <td className="p-2">{data.matches}</td>
      <td className="p-2">{`${data.winRatio}%`}</td>
      <td className="p-2">{data.wins}</td>
      <td className="p-2">{data.losses}</td>
    </tr>
  );
}
const ScoreTable = ({ calibrated, uncalibrated }) => {
  return (
    <div className="overflow-x-auto">
      <p className="font-semibold text-nord-5 text-xl text-center mb-4">
        Ställning
      </p>
      <table className="w-full tabular-nums text-right">
        <thead className="text-nord-9 text-right">
          <tr>
            {/* For awards, no text needed*/}
            <td className="p-2" />
            <td className="p-2 text-left">Namn</td>
            <td className="p-2">ELO</td>
            <td className="p-2">K/D/A</td>
            <td className="p-2">FP</td>
            <td className="p-2">Matcher</td>
            <td className="p-2">Vinstandel</td>
            <td className="p-2">Vinster</td>
            <td className="p-2">Förluster</td>
          </tr>
        </thead>
        <tbody className="text-nord-4 divide-y-2 divide-nord-3">
          {calibrated.map((row) => (
            <ScoreRow key={row.name} data={row} />
          ))}
          {uncalibrated.length > 0 && calibrated.length > 0 && (
            <tr>
              <td
                colSpan="9"
                className="py-4 sm:text-center text-left sm:pl-0 pl-6 font-semibold"
              >
                Okalibrerade spelare
              </td>
            </tr>
          )}
          {uncalibrated.length > 0 &&
            uncalibrated.map((row) => <ScoreRow key={row.name} data={row} />)}
        </tbody>
      </table>
    </div>
  );
};

const ScoreBoard = ({ matches, players }) => {
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
    <div className="bg-nord-1 p-2 rounded text-nord-5 shadow">
      <ScoreTable calibrated={calibrated} uncalibrated={uncalibrated} />
    </div>
  );
};

export default ScoreBoard;
