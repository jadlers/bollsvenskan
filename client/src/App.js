import React, { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";

import { SnackbarContextProvider } from "./SnackbarContext";

import ScoreBoard from "./components/ScoreBoard";
import NewMatchForm from "./components/NewMatchForm";
import NewPlayerForm from "./components/NewPlayerForm";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchAllMatches = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;

      const res = await fetch(`${baseUrl}/match`);
      if (!res.ok) {
        return;
      }

      const body = await res.json();
      setMatches(body.matches);
    };

    fetchAllMatches();
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1em",
      }}
    >
      <SnackbarContextProvider>
        <h1
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          {
            "Kung DotA 🏆" /* TODO: Should be dependent on the league you're viewing */
          }
        </h1>
        <Router>
          <ScoreBoard path="/" matches={matches} />
          <NewMatchForm path="/add-match" />
          <NewPlayerForm path="/add-player" />
        </Router>
      </SnackbarContextProvider>
    </div>
  );
}

export default App;
