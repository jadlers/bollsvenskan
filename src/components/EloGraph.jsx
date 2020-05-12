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
  let eloValues = [];
  let lastEloVal = null;
  let lastPlayedMatchIdx = -1;
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const playersInMatch = match.teams.flat();
    if (playersInMatch.map((m) => m.id).includes(playerId)) {
      const eloForMatch = playersInMatch.find((p) => p.id === playerId)
        .eloRating;
      lastEloVal = eloForMatch;
      lastPlayedMatchIdx = i;
    }
    eloValues.push(lastEloVal);
  }

  // Go backwards in history and set current eloRating for the last matches if
  // the player has not been in the last matches
  eloValues = eloValues.slice(0, lastPlayedMatchIdx + 1);
  for (let i = 0; i < matches.length - lastPlayedMatchIdx; i++) {
    eloValues.push(player.currentElo);
  }

  return {
    label: name,
    fill: false,
    data: eloValues,
  };
}

export default function EloGraph({ matches, players }) {
  if (matches.length === 0 || players.length === 0) return <p>Loading...</p>;

  const playersInMatches = getAllPlayers(matches);
  // Add current ELO as well
  playersInMatches.forEach((player) => {
    const currentElo = players.find((p) => p.id === player.id).eloRating;
    player.currentElo = currentElo;
  });
  const datasets = playersInMatches.map((player) =>
    createDatasetForPlayer(player, matches)
  );

  console.log(datasets);

  const data = {
    labels: datasets[0].data.map((_, idx) => idx),
    datasets,
  };
  return <Line data={data} />;
}
