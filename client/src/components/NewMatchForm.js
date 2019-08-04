import React, { useContext, useState, useEffect } from "react";

import { SnackbarContext } from "../SnackbarContext";

import Button from "@material-ui/core/Button";

import TeamFields from "./TeamFields";

const NewMatchForm = ({ navigate }) => {
  const snackbar = useContext(SnackbarContext);

  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);

  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;

      const res = await fetch(`${baseUrl}/player`);
      if (!res.ok) {
        return;
      }

      const body = await res.json();
      setPlayers(body.players);
    };

    fetchPlayers();
  }, []);

  const handlePlayerUpdate = (teamArray, setTeamArray) => {
    return e => {
      const userId = parseInt(e.target.value);

      if (e.target.checked) {
        setTeamArray([userId, ...teamArray]);
      } else {
        setTeamArray(teamArray.filter(p => p !== userId));
      }
    };
  };

  const handleSubmit = async () => {
    const data = {
      teams: [team1Players, team2Players],
      score: [parseInt(team1Score), parseInt(team2Score)],
      winner: team1Score > team2Score ? 0 : 1,
    };

    const baseUrl = process.env.REACT_APP_API_URL;
    try {
      const res = await fetch(`${baseUrl}/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        snackbar.open("Successfully saved match");
        navigate("/");
      } else {
        snackbar.open("Failed to save match");
      }
    } catch (error) {
      snackbar.open("Failed to save match");
      console.log("Error:", error);
    }
  };

  return (
    <>
      <form action="post">
        <TeamFields
          teamNum={1}
          teamScore={team1Score}
          setTeamScore={setTeam1Score}
          players={players}
          opponents={team2Players}
          handlePlayerUpdate={handlePlayerUpdate(team1Players, setTeam1Players)}
        />
        <TeamFields
          teamNum={2}
          teamScore={team2Score}
          setTeamScore={setTeam2Score}
          players={players}
          opponents={team1Players}
          handlePlayerUpdate={handlePlayerUpdate(team2Players, setTeam2Players)}
        />
        <div />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Spara
        </Button>
      </form>
    </>
  );
};

export default NewMatchForm;
