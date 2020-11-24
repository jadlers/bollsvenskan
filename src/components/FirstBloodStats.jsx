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

function FirstBloodStats({ players, matches }) {
  let displayRow = useMediaQuery("(min-width: 700px)");

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
