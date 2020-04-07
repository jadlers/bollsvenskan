import React, { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";

import { SnackbarContextProvider } from "./SnackbarContext";

import NewMatchForm from "./components/NewMatchForm";
import NewPlayerForm from "./components/NewPlayerForm";
import LeagueOverview from "./components/LeagueOverview";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchAllMatches = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;

      // TODO: This should default to /league/2 for the current dota 2 league
      // NOTE: That endpoint however is not completed
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
          <LeagueOverview path="/" matches={matches} />
          {/* Show table from specific league */}
          <LeagueOverview path="/league/:leagueId" />
          <NewMatchForm path="/add-match" />
          <NewPlayerForm path="/add-player" />
        </Router>
      </SnackbarContextProvider>
    </div>
  );
}

export default App;
