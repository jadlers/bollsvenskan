import openDotaHeroes from "./heroes.json";

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

/**
 * Gets the icon url from the constant list of heroes. The json file might need
 * to be updated at a later point and was retrieved from here:
 * https://github.com/odota/dotaconstants/blob/master/build/heroes.json
 */
export function getHeroIconUrl(heroId) {
  const hero = openDotaHeroes[`${heroId}`];
  return `https://steamcdn-a.akamaihd.net${hero.icon}`;
}
