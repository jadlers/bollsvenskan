import React from "react";
import { playerIdsInMatches } from "../util";

import { Line } from "react-chartjs-2";

function createDatasetForPlayer(player, matches, season) {
  const { id: playerId, username: name } = player;
  const playersSeasons = player.stats
    .filter((stats) => stats.season !== undefined)
    .map((stats) => stats.season);
  const lastSeason = season - 1;
  let eloValues = [1500];
  if (playersSeasons.includes(lastSeason)) {
    // TODO: Improve to find any previous season
    const lastSeasonStats = player.stats.find((s) => s.season === lastSeason);
    eloValues = [lastSeasonStats.seasonElo];
  }
  for (const match of matches) {
    const playersInMatch = match.teams.flat();
    if (playersInMatch.map((m) => m.id).includes(playerId)) {
      const eloForMatch = playersInMatch.find((p) => p.id === playerId)
        .eloRating;
      eloValues.push(eloForMatch);
    } else {
      eloValues.push(null);
    }
  }

  return {
    label: name,
    fill: false,
    spanGaps: true,
    lineTension: 0.5,
    data: eloValues,
  };
}

export default function EloGraph({ matches, players, season }) {
  if (matches.length === 0) return <p>Loading...</p>;

  const includedPlayers = playerIdsInMatches(matches);
  const datasets = players
    .filter((p) => includedPlayers.includes(p.id) && p.id !== 25)
    .map((player) => createDatasetForPlayer(player, matches, season));

  // Copied bright colors from:
  // https://seaborn.pydata.org/tutorial/color_palettes.html
  const colors = [
    { fill: "rgba(232, 0, 11, 0.1)", border: "rgba(232, 0, 11, 1)" },
    { fill: "rgba(139, 43, 226, 0.1)", border: "rgba(139, 43, 226, 1)" },
    { fill: "rgba(159, 72, 0, 0.1)", border: "rgba(159, 72, 0, 1)" },
    { fill: "rgba(241, 76, 193, 0.1)", border: "rgba(241, 76, 193, 1)" },
    { fill: "rgba(163, 163, 163, 0.1)", border: "rgba(163, 163, 163, 1)" },
    { fill: "rgba(255, 196, 0, 0.1)", border: "rgba(255, 196, 0, 1)" },
    { fill: "rgba(0, 215, 255, 0.1)", border: "rgba(0, 215, 255, 1)" },
    { fill: "rgba(2, 62, 255, 0.1)", border: "rgba(2, 62, 255, 1)" },
    { fill: "rgba(255, 124, 0, 0.1)", border: "rgba(255, 124, 0, 1)" },
    { fill: "rgba(26, 201, 56, 0.1)", border: "rgba(26, 201, 56, 1)" },
  ];

  datasets.forEach((ds, idx) => {
    ds.backgroundColor = colors[idx % colors.length].fill;
    ds.borderColor = colors[idx % colors.length].border;
    if (idx >= colors.length) {
      ds.borderDash = [15, 5];
    }
  });

  const data = {
    labels: datasets[0].data.map((_, idx) => (idx === 0 ? "start" : idx)),
    datasets,
  };

  // TODO: make mobile options to styling in a better way
  let mobileOptions = {};
  if (window.innerWidth < 500) {
    mobileOptions.height = 500;
    mobileOptions.options = { maintainAspectRatio: false };
  }

  return <Line {...mobileOptions} data={data} />;
}
