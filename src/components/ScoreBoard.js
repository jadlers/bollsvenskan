import React from "react";
import { navigate } from "@reach/router";
import ReactTooltip from "react-tooltip";

import Card from "../components/Card";

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
    points: wins * 3 + losses * -1,
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

function ScoreRow({ data, showPoints }) {
  return (
    <tr className="hover:bg-theme-background-2">
      <td className="py-2 px-0 text-left">
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
      <td className="py-2">{data.average.kills}</td>
      <td className="py-2">{data.average.deaths}</td>
      <td className="py-2">{data.average.assists}</td>
      <td className="p-2">{data.matches}</td>
      <td className="p-2">{`${data.winRatio}%`}</td>
      <td className="p-2">{data.wins}</td>
      <td className="p-2">{data.losses}</td>
      {showPoints && <td className="p-2">{data.points}</td>}
    </tr>
  );
}

const ScoreTable = ({ calibrated, uncalibrated, showPoints }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full tabular-nums text-right">
        <thead className="text-nord-9 text-right">
          <tr>
            {/* For awards, no text needed*/}
            <td className="py-2 px-0" />
            <td className="p-2 text-left">Namn</td>
            <td className="p-2">ELO</td>
            <td className="py-2">K</td>
            <td className="py-2">D</td>
            <td className="py-2">A</td>
            <td className="p-2">Matcher</td>
            <td className="p-2">Vinstandel</td>
            <td className="p-2">Vinster</td>
            <td className="p-2">Förluster</td>
            {showPoints && <td className="p-2">Poäng</td>}
          </tr>
        </thead>
        <tbody className="text-theme-text-primary divide-y-2 divide-theme-background-2 transition-colors">
          {calibrated.map((row) => (
            <ScoreRow key={row.name} data={row} showPoints={showPoints} />
          ))}
          {uncalibrated.length > 0 && calibrated.length > 0 && (
            <tr>
              <td
                colSpan="10"
                className="py-4 sm:text-center text-left sm:pl-0 pl-6 font-semibold"
              >
                Okalibrerade spelare
              </td>
            </tr>
          )}
          {uncalibrated.length > 0 &&
            uncalibrated.map((row) => (
              <ScoreRow key={row.name} data={row} showPoints={showPoints} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

const SortToggle = ({ value, handleSelect }) => (
  <div className="flex flex-row justify-end">
    <ReactTooltip id="new-points-explanation" place="top" effect="solid" />
    <label
      data-for="new-points-explanation"
      data-tip="+3 för vinst, -1 för förlust"
    >
      Alternativ sortering
      <input value={value} onClick={handleSelect} type="checkbox" />
    </label>
  </div>
);

const ScoreBoard = ({ matches, players, season }) => {
  const [alternateSort, setAlternateSort] = React.useState(false);
  const toggleSort = () => setAlternateSort(!alternateSort);

  const scores = players.map((player) =>
    createTableRowForPlayer(player, matches)
  );

  // Sort all players on win ratio
  if (alternateSort) {
    scores.sort((a, b) => b.points - a.points);
  } else {
    scores.sort((a, b) => b.winRatio - a.winRatio);
  }

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

  const title = isNaN(season)
    ? "Ställning"
    : `Ställning - Säsong ${season + 1}`;

  return (
    <Card title={title}>
      <ScoreTable
        calibrated={calibrated}
        uncalibrated={uncalibrated}
        showPoints={alternateSort}
      />
      <SortToggle value={alternateSort} handleSelect={toggleSort} />
    </Card>
  );
};

export default ScoreBoard;
