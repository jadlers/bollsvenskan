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
export function getHeroIcon(heroId) {
  const hero = openDotaHeroes[`${heroId}`];
  if (!hero) {
    console.warn(`Could not find hero with id ${heroId}`);
    return ["", ""];
  }

  // Newer heros (Snapfire, Void Spirit, and Hoodwink) not available from steamcdn
  const iconUrl = [123, 126, 128].includes(heroId)
    ? `https://www.opendota.com/assets/images/dota2/heroes/${heroId}_icon.png`
    : `https://steamcdn-a.akamaihd.net${hero.icon}`;
  return [iconUrl, hero.localized_name];
}
