import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

const TeamFields = ({
  teamNum,
  teamScore,
  setTeamScore,
  players,
  opponents,
  handlePlayerUpdate,
}) => {
  const handleUpdateScore = value => {
    let val = parseInt(value) || "";
    if (val < 0) val = 0;
    setTeamScore(val);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "1em 1%" }}>
      <TextField
        type="number"
        label={`Mål lag ${teamNum}`}
        variant="outlined"
        value={teamScore}
        onChange={e => handleUpdateScore(e.target.value)}
        style={{ marginBottom: "1em" }}
        required
      />
      <FormControl>
        <FormLabel>{`Spelare lag ${teamNum}`}</FormLabel>
        <FormGroup>
          {players.map(p => (
            <FormControlLabel
              key={p.id}
              control={<Checkbox value={p.id} />}
              label={p.username}
              onChange={e => handlePlayerUpdate(e, teamNum - 1)}
              disabled={opponents.includes(p.id)}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default TeamFields;
