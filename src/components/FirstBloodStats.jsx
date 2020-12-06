import React from "react";

import FirstBloodTable from "./FirstBloodTable";

function countOccurancesReducer(acc, val) {
  if (!acc[val]) {
    acc[val] = 1;
  } else {
    acc[val] += 1;
  }
  return acc;
}

function FirstBloodStats({ players, matches }) {
  const diedFirstBloodCounter = matches
    .map((match) => match.diedFirstBlood)
    .reduce(countOccurancesReducer, {});
  const diedFirstBloodList = players.map((player) => {
    const amount = diedFirstBloodCounter[player.id] || 0;
    return { name: player.username, amount };
  });

  const claimedFirstBloodCounter = matches
    .map((match) => match.claimedFirstBlood)
    .filter((c) => c !== null) // Sometimes there is no registered killer
    .reduce(countOccurancesReducer, {});
  const claimedFirstBloodList = players.map((player) => {
    const amount = claimedFirstBloodCounter[player.id] || 0;
    return { name: player.username, amount };
  });

  return (
    <div className="flex flex-col lg:flex-row mb-6 lg:justify-around">
      <FirstBloodTable
        title="Begick första mordet"
        data={claimedFirstBloodList}
      />
      <FirstBloodTable
        title="Var först med att stupa"
        data={diedFirstBloodList}
      />
    </div>
  );
}

export default FirstBloodStats;
