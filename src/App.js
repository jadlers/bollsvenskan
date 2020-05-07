import React, { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";

import { SnackbarContextProvider } from "./SnackbarContext";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "1em",
      }}
    >
      <SnackbarContextProvider>
        <Typography
          variant="h1"
          align="center"
          style={{ cursor: "pointer" }}
          gutterBottom
          onClick={() => navigate("/")}
        >
          Kung DotA 🏆
        </Typography>
        {/* Container */}
        <div style={{ margin: "10px auto", textAlign: "center" }}>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            href="http://nextcloud.jacobadlers.com/index.php/s/nntLtmeAFytc3SW"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anmälan
          </Button>
        </div>
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
