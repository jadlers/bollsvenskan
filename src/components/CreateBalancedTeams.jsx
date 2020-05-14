import React, { useContext, useState } from "react";

import { SnackbarContext } from "../SnackbarContext";

import Button from "@material-ui/core/Button";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";

const CreateBalancedTeams = ({ players }) => {
  const snackbar = useContext(SnackbarContext);

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState({});
  const [choseSide] = useState(Math.random() < 0.5 ? 0 : 1);

  const handlePlayerUpdate = (e) => {
    const userId = parseInt(e.target.value);

    if (e.target.checked) {
      setSelectedPlayers([userId, ...selectedPlayers]);
    } else {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== userId));
    }
  };

  const handleSubmit = async () => {
    const data = { players: selectedPlayers };

    const baseUrl = process.env.REACT_APP_API_URL;
    try {
      // NOTE: Should not hard code the league
      snackbar.open("Balanserar lagen");
      const res = await fetch(`${baseUrl}/league/2/create-teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const body = await res.json();
        setTeams(body);
      } else {
        snackbar.open("Misslyckades med att balansera lagen");
      }
    } catch (error) {
      snackbar.open("Misslyckades med att balansera lagen");
      console.log("Error:", error);
    }
  };

  return (
    <Card raised>
      <CardContent>
        {Object.entries(teams).length === 0 ? (
          <form action="post">
            <FormControl>
              <FormLabel style={{ alignSelf: "center" }}>
                Välj spelare till match
              </FormLabel>
              <FormGroup style={{ flexFlow: "row wrap" }}>
                {players.map((p) => (
                  <FormControlLabel
                    key={p.id}
                    control={<Checkbox value={p.id} />}
                    label={p.username}
                    onChange={(e) => handlePlayerUpdate(e)}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Skapa lag
            </Button>
          </form>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {Object.entries(teams).map((team, idx) => {
              return (
                <div key={team[1].players[0]}>
                  <p>{`Genomsnittlig ELO: ${team[1].rating.toFixed(2)}`}</p>
                  <p>
                    {idx === choseSide
                      ? "Väljer Radiant eller Dire"
                      : "Väljer first pick eller last pick"}
                  </p>
                  <ul>
                    {team[1].players.map((player) => (
                      <li key={player}>{player}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateBalancedTeams;
