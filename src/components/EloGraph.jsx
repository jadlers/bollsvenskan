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
  const eloValues = [];
  let lastEloVal = null;
  for (const match of matches) {
    const playersInMatch = match.teams.flat();
    if (playersInMatch.map((m) => m.id).includes(playerId)) {
      const eloForMatch = playersInMatch.find((p) => p.id === playerId)
        .eloRating;
      lastEloVal = eloForMatch;
    }

    eloValues.push(lastEloVal);
  }

  return {
    label: name,
    fill: false,
    data: eloValues,
  };
}

export default function EloGraph({ matches }) {
  if (matches.length === 0) return <p>Loading...</p>;

  const players = getAllPlayers(matches);
  const datasets = players.map((player) =>
    createDatasetForPlayer(player, matches)
  );

  console.log(datasets);

  const data = {
    labels: matches.map((_, idx) => idx + 1),
    datasets,
  };
  return <Line data={data} />;
}
