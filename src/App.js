import React, { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";

import { SnackbarContextProvider } from "./SnackbarContext";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import CreateBalancedTeams from "./components/CreateBalancedTeams";
import EloGraph from "./components/EloGraph";
import LeagueOverview from "./components/LeagueOverview";
import NewMatchForm from "./components/NewMatchForm";
import NewPlayerForm from "./components/NewPlayerForm";
import ShowBalancedTeams from "./components/ShowBalancedTeams";
import DotaFirstBloodPhrases from "./pages/DotaFirstBloodPhrases";

function App() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [pollUrl, setPollUrl] = useState(
    // Default to document with all links
    "http://nextcloud.jacobadlers.com/index.php/s/nntLtmeAFytc3SW"
  );

  useEffect(() => {
    const fetchAllMatches = async () => {
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
  }, [baseUrl]);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      const res = await fetch(`${baseUrl}/player?type=dota`);
      if (!res.ok) {
        return;
      }

      const body = await res.json();
      setPlayers(body.players);
    };

    fetchAllPlayers();
  }, [baseUrl]);

  useEffect(() => {
    const fetchSignupLinks = async () => {
      try {
        const res = await fetch(`${baseUrl}/dota-signup`);
        if (!res.ok) {
          return;
        }

        const body = await res.json();
        if (body.currentPollUrl !== "") {
          setPollUrl(body.currentPollUrl);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (process.env.NODE_ENV !== "development") {
      console.log("Fetching polls");
      fetchSignupLinks();
    }
  }, [baseUrl]);

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
          variant="h3"
          align="center"
          style={{ cursor: "pointer" }}
          gutterBottom
          onClick={() => navigate("/")}
        >
          Kung DotA{" "}
          <span role="img" aria-label="Trophy">
            🏆
          </span>
        </Typography>
        {/* Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px auto",
            textAlign: "center",
          }}
        >
          <div>
            <Button onClick={() => navigate("/league/2/0")}>Säsong 1</Button>
            <Button onClick={() => navigate("/league/2/1")}>Säsong 2</Button>
          </div>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            href={pollUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Anmälan
          </Button>
        </div>
        <Router>
          <LeagueOverview path="/" matches={matches} players={players} />
          {/* Show table from specific league */}
          <LeagueOverview
            path="/league/:leagueId"
            matches={matches}
            players={players}
          />
          <LeagueOverview
            path="/league/:leagueId/:season"
            matches={matches}
            players={players}
          />
          <EloGraph path="/elo" matches={matches} players={players} />
          <CreateBalancedTeams path="/reveal-teams" players={players} />
          <ShowBalancedTeams path="/teams" players={players} />
          <NewMatchForm path="/add-match" />
          <NewPlayerForm path="/add-player" />
          <DotaFirstBloodPhrases path="/add-fb-phrase" />
        </Router>
      </SnackbarContextProvider>
    </div>
  );
}

export default App;
