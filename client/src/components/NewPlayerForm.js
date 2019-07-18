import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const NewPlayerForm = () => {
  const [username, updateUsername] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(e);
    if (!e.target.checkValidity) {
      console.log("Invalid form");
      return;
    }

    try {
      const baseUrl = process.env.REACT_APP_API_URL;

      const response = await fetch(`${baseUrl}/player`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // TODO: Add user to DB
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <TextField
        type="text"
        label="Namn"
        variant="outlined"
        value={username}
        onChange={e => updateUsername(e.target.value)}
        style={{ marginBottom: "1em" }}
        required
      />
      <Button variant="contained" color="primary">
        Spara
      </Button>
    </form>
  );
};

export default NewPlayerForm;
