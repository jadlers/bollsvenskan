import React, { useContext, useState } from "react";

import { SnackbarContext } from "../SnackbarContext";
import useStoredSetting from "../hooks/useStoredSetting";

function AddUser() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const snackbar = useContext(SnackbarContext);
  const [apiKey] = useStoredSetting("apiKey");

  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      console.log("Invalid form", e.target);
      snackbar.open("Ogiltigt ifyllt formulär");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/player?api_key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const body = await response.json();

      if (response.ok) {
        snackbar.open(`Användare tillagd! Fick id=${body.userId}`);
        setUsername("");
      } else {
        snackbar.open(body.message);
      }
    } catch (error) {
      snackbar.open("Misslyckades med att lägga till ny användare.");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-2 max-w-screen-sm"
    >
      <label htmlFor="username" className="-mb-1">
        Användarnamn:
      </label>
      <div>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 bg-theme-background-2"
          required
        />
        <input
          className="bg-theme-background-1 hover:bg-theme-background-2 p-2 uppercase cursor-pointer font-bold text-nord-8 ml-2"
          type="submit"
          value="Lägg till"
        />
      </div>
    </form>
  );
}

export default AddUser;
