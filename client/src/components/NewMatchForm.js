import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

const NewMatchForm = () => {
  const [team1Players, setTeam1Players] = useState([]);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Players, setTeam2Players] = useState([]);
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

  const handleUpdateScore = (value, updateFunc) => {
    if (value < 0) value = 0;
    updateFunc(value);
  };

  const handlePlayerUpdate = (e, currentPlayers, updateFunc) => {
    const userId = parseInt(e.target.value);

    if (e.target.checked) {
      updateFunc([userId, ...currentPlayers]);
    } else {
      updateFunc(currentPlayers.filter(p => !userId));
    }
  };

  const handleSubmit = () => {
    const data = {
      teams: [team1Players, team2Players],
      score: [parseInt(team1Score), parseInt(team2Score)],
      winner: team1Score > team2Score ? 0 : 1,
    };
    console.log(data); // TODO: Post to API with this match object
  };

  return (
    <form action="post">
      <TextField
        type="number"
        label="Mål lag 1"
        variant="outlined"
        value={team1Score}
        onChange={e => handleUpdateScore(e.target.value, setTeam1Score)}
      />
      <div />
      <FormControl>
        <FormLabel>Lag 1</FormLabel>
        <FormGroup>
          {players
            .filter(p => !team2Players.includes(p.id))
            .map(p => (
              <FormControlLabel
                key={p.id}
                control={<Checkbox value={p.id} />}
                label={p.username}
                onChange={e =>
                  handlePlayerUpdate(e, team1Players, setTeam1Players)
                }
              />
            ))}
        </FormGroup>
      </FormControl>
      <div />

      <TextField
        type="number"
        min="1"
        max="2"
        step="1"
        variant="outlined"
        label="Mål lag 2"
        value={team2Score}
        onChange={e => handleUpdateScore(e.target.value, setTeam2Score)}
      />
      <div />
      <FormControl>
        <FormLabel>Lag 2</FormLabel>
        <FormGroup>
          {players
            .filter(p => !team1Players.includes(p.id))
            .map(p => (
              <FormControlLabel
                key={p.id}
                control={<Checkbox value={p.id} />}
                label={p.username}
                onChange={e =>
                  handlePlayerUpdate(e, team2Players, setTeam2Players)
                }
              />
            ))}
        </FormGroup>
      </FormControl>
      <div />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Spara
      </Button>
    </form>
  );
};

export default NewMatchForm;
