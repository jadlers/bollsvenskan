import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import FirstBloodTable from "./FirstBloodTable";

function countOccurancesReducer(acc, val) {
  if (!acc[val]) {
    acc[val] = 1;
  } else {
    acc[val] += 1;
  }
  return acc;
}

function mapIdToUsername(id, players) {
  if (typeof id === "string") {
    id = parseInt(id);
  }

  return players.find((p) => p.id === id)?.username;
}

function FirstBloodStats({ players, matches }) {
  let displayRow = useMediaQuery("(min-width: 700px)");

  const diedFirstBloodCounter = matches
    .map((match) => match.diedFirstBlood)
    .reduce(countOccurancesReducer, {});

  let diedFirstBloodList = [];
  for (const [playerId, deaths] of Object.entries(diedFirstBloodCounter)) {
    diedFirstBloodList.push({
      name: mapIdToUsername(playerId, players),
      amount: deaths,
    });
  }

  const claimedFirstBloodCounter = matches
    .map((match) => match.claimedFirstBlood)
    .filter((c) => c !== null) // Sometimes there is no registered killer
    .reduce(countOccurancesReducer, {});
  let claimedFirstBloodList = [];
  for (const [playerId, deaths] of Object.entries(claimedFirstBloodCounter)) {
    const name = mapIdToUsername(playerId, players);
    claimedFirstBloodList.push({
      name,
      amount: deaths,
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: displayRow ? "row" : "column",
        justifyContent: "space-around",
      }}
    >
      <FirstBloodTable
        title="Begick första mordet"
        data={claimedFirstBloodList}
        displayRow={displayRow}
      />
      <FirstBloodTable
        title="Var först med att stupa"
        data={diedFirstBloodList}
        displayRow={displayRow}
      />
    </div>
  );
}

export default FirstBloodStats;
