import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";

import TeamFields from "./TeamFields";

const SlidingTransition = props => <Slide {...props} direction="down" />;

const NewMatchForm = () => {
  const [snack, setSnack] = useState({ isOpen: false, message: "" });
  const handleCloseSnack = () => setSnack({ ...snack, isOpen: false });

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
        setSnack({
          ...snack,
          isOpen: true,
          message: "Successfully saved match",
        });
      } else {
        setSnack({ ...snack, isOpen: true, message: "Failed to save match" });
      }
    } catch (error) {
      setSnack({ ...snack, isOpen: true, message: "Failed to save match" });
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Snackbar
        open={snack.isOpen}
        onClose={handleCloseSnack}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        TransitionComponent={SlidingTransition}
        message={snack.message}
      />

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
