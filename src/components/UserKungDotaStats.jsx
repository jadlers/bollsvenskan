import React from "react";

function UserKungDotaStats({ stats }) {
  const seasons = stats.filter(({ season }) => season !== undefined);
  if (seasons.length === 0) {
    return <p>Har inte spelat i någon säsong.</p>;
  }

  return seasons.map((season) => (
    <div key={season.season}>
      <SeasonStats stats={season} />
    </div>
  ));
}

function SeasonStats({ stats }) {
  const averageKills = (stats.kills / stats.matches).toFixed(2);
  const averageDeaths = (stats.deaths / stats.matches).toFixed(2);
  const averageAssists = (stats.assists / stats.matches).toFixed(2);

  return (
    <div>
      <p className="font-semibold">Säsong {stats.season + 1}</p>
      <ul>
        <li>Matcher: {stats.matches}</li>
        <li>Avslutande ELO: {stats.seasonElo}</li>
        <li>
          Kills: {stats.kills} ({averageKills} per match)
        </li>
        <li>
          Deaths: {stats.deaths} ({averageDeaths} per match)
        </li>
        <li>
          Assists: {stats.assists} ({averageAssists} per match)
        </li>
        <li>
          Dog först {stats.firstBloodsDied}{" "}
          {stats.firstBloodsDied === 1 ? "gång" : "gånger"} (
          {((stats.firstBloodsDied / stats.matches) * 100).toFixed(0)}%)
        </li>
        <li>
          Fick first blood {stats.firstBloodsClaimed}{" "}
          {stats.firstBloodsClaimed === 1 ? "gång" : "gånger"} (
          {((stats.firstBloodsClaimed / stats.matches) * 100).toFixed(0)}%)
        </li>
      </ul>
    </div>
  );
}

export default UserKungDotaStats;
