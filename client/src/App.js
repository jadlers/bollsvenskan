import React from "react";
import { Router } from "@reach/router";

import ScoreBoard from "./components/ScoreBoard";
import NewMatchForm from "./components/NewMatchForm";

const jacob = "Jacob";
const dennis = "Dennis";
const wille = "Wille";
const max = "Max";
const simon = "Simon";
const teo = "Teo";
const felix = "Felix";
const erik = "Erik";
const linus = "Linus";
const rebecca = "Rebecca";
const benjamin = "Benjamin";
const filip = "Filip";
const samuel = "Samuel";
const anton = "Anton";
const hilda = "Hilda";
const isaac = "Isaac";
const kalle = "Kalle";
const matthias = "Matthias";

const matches = [
  {
    date: "2019-06-15",
    teams: [[wille, teo, max, dennis, felix], [jacob, simon, erik, linus]],
    score: [3, 2],
    winner: 0,
  },
  {
    teams: [[max, dennis, simon, jacob], [wille, teo, felix, erik, linus]],
    score: [3, 2],
    winner: 0,
  },
  {
    teams: [[erik, dennis, teo, max, jacob], [wille, felix, linus, simon]],
    score: [3, 2],
    winner: 0,
  },
  {
    teams: [[dennis, jacob, felix, wille], [erik, simon, linus, teo, max]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[wille, simon, max, linus], [dennis, teo, felix, erik, jacob]],
    score: [3, 1],
    winner: 0,
  },
  {
    teams: [[erik, wille, felix, simon, linus], [dennis, teo, max, jacob]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[simon, dennis, max, jacob, teo], [linus, felix, erik, wille]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[erik, felix, wille, linus, simon], [dennis, jacob, max, teo]],
    score: [3, 1],
    winner: 0,
  },
  {
    date: "2019-06-24",
    teams: [[linus, wille, filip], [benjamin, anton, dennis, samuel]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[benjamin, filip, anton], [linus, wille, dennis, samuel]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[wille, samuel, linus], [benjamin, filip, anton, dennis]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[dennis, samuel, filip], [wille, linus, benjamin, anton]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[dennis, anton, benjamin], [wille, linus, filip, samuel]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[dennis, anton, benjamin], [wille, linus, filip, samuel]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[dennis, filip, benjamin], [anton, wille, linus, samuel]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[dennis, filip, benjamin], [anton, wille, linus, samuel]],
    score: [3, 0],
    winner: 0,
  },
  {
    date: "2019-07-01",
    teams: [
      [dennis, linus, max, erik, anton],
      [hilda, teo, rebecca, simon, jacob],
    ],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [
      [hilda, linus, rebecca, simon, jacob],
      [erik, dennis, anton, teo, max],
    ],
    score: [3, 1],
    winner: 0,
  },
  {
    teams: [
      [jacob, dennis, simon, linus, max],
      [teo, hilda, anton, erik, rebecca],
    ],
    score: [3, 1],
    winner: 0,
  },
  {
    teams: [
      [jacob, rebecca, dennis, teo, max],
      [erik, simon, hilda, anton, linus],
    ],
    score: [3, 2],
    winner: 0,
  },
  {
    teams: [
      [teo, max, erik, simon, dennis],
      [jacob, anton, hilda, rebecca, linus],
    ],
    score: [3, 2],
    winner: 0,
  },
  {
    date: "2019-07-08",
    teams: [[linus, wille, simon, kalle], [erik, teo, hilda, dennis, isaac]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [
      [kalle, linus, wille, erik, anton],
      [simon, teo, filip, hilda, dennis, isaac],
    ],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [
      [kalle, linus, teo, wille, erik, filip],
      [simon, anton, hilda, dennis, isaac],
    ],
    score: [],
    winner: 0,
  },
  {
    teams: [
      [hilda, dennis, erik, filip, anton],
      [linus, wille, simon, kalle, teo, isaac],
    ],
    score: [3, 2],
    winner: 0,
  },
  {
    teams: [
      [linus, wille, hilda, kalle, isaac],
      [simon, erik, anton, teo, filip, dennis],
    ],
    score: [3, 2],
    winner: 0,
  },
  {
    teams: [
      [wille, linus, simon, filip, kalle],
      [erik, anton, teo, hilda, dennis, isaac],
    ],
    score: [3, 2],
    winner: 0,
  },
  {
    date: "2019-07-15",
    teams: [[kalle, matthias, dennis, wille], [hilda, erik, isaac]],
    score: [3, 0],
    winner: 0,
  },
  {
    teams: [[wille, isaac, kalle], [dennis, matthias, erik, hilda]],
    score: [3, 1],
    winner: 0,
  },
  {
    teams: [[dennis, hilda, wille], [isaac, kalle, erik, matthias]],
    score: [3, 1],
    winner: 0,
  },
  {
    teams: [[dennis, hilda, matthias, isaac], [kalle, erik, wille]],
    score: [3, 2],
    winner: 0,
  },
  {
    teams: [[kalle, wille, dennis], [hilda, matthias, isaac, erik]],
    score: [3, 2],
    winner: 0,
  },
];

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>{"⚽ Bollsvenskan 🥅"}</h1>
      <Router>
        <ScoreBoard path="/" matches={matches} />
        <NewMatchForm path="/add-match" />
      </Router>
    </div>
  );
}

export default App;
