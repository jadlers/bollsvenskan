import React from "react";

import ScoreBoard from "./components/ScoreBoard";

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>{"⚽ Bollsvenskan 🥅"}</h1>
      <ScoreBoard />
    </div>
  );
}

export default App;
