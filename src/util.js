/**
 * Returns the ids of all players which played in any of matches provided.
 */
function playerIdsInMatches(matches) {
  const playerIdSet = new Set();
  let players = [];
  matches.forEach((match) => {
    match.teams.forEach((team) => {
      team.forEach((player) => {
        if (!playerIdSet.has(player.id)) {
          players.push(player.id);
          // players.push({ id: player.id, name: player.name });
        }
        playerIdSet.add(player.id);
      });
    });
  });
  return players;
}

export { playerIdsInMatches };

export function leftZeroPad(num, len) {
  return num.toString().padStart(len, "0");
}
