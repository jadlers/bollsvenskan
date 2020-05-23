import React from "react";

import { Line } from "react-chartjs-2";

// NOTE: Copied from ScoreBoard.js, should move to util.js or something to reuse
function getAllPlayers(matches) {
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
}

function createDatasetForPlayer(player, matches) {
  const { id: playerId, name } = player;
  let eloValues = [1500]; // Initial ELO for all players
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

export default function EloGraph({ matches }) {
  if (matches.length === 0) return <p>Loading...</p>;

  const players = getAllPlayers(matches);
  const datasets = players.map((player) =>
    createDatasetForPlayer(player, matches)
  );

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
    labels: datasets[0].data.map((_, idx) => idx),
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
