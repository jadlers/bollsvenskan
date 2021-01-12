import React, { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../SnackbarContext";

import useStoredSetting from "../hooks/useStoredSetting";

function UpdateUserInformation({ user }) {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [apiKey] = useStoredSetting("apiKey");
  const snackbar = useContext(SnackbarContext);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        username: user.username,
        eloRating: user.eloRating || null,
        steam32id: user.steam32id || null,
        discordId: user.discordId || null,
        discordUsername: user.discordUsername || null,
      });
    }
  }, [user]);

  const updateProperty = (propName, integer = false) => {
    return (e) => {
      let val = e.target.value;
      if (integer) {
        val = parseInt(val);
      } else {
        val = val === "" ? null : val.trim();
      }
      setUpdatedUser({ ...updatedUser, [propName]: val });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apiKey) {
      snackbar.open("Kan inte uppdatera användare utan sparad API nyckel.");
      return;
    }

    const res = await fetch(`${baseUrl}/player/${user.id}?api_key=${apiKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
      if (res.status === 401) {
        snackbar.open("API nyckel inte giltig.");
      } else {
        snackbar.open("Oväntat fel.");
      }
    } else {
      const body = await res.json();
      snackbar.open(
        `Användare med id=${user.id} (${body.player.username}) uppdaterad.`
      );

      // TODO: Should not need to refresh page to see updates
      setTimeout(() => location.reload(), 2000);
    }
  };

  const inputStyle = "p-2 mb-2 bg-nord-3 rounded";
  return (
    <div>
      {!apiKey && (
        <p className="font-semibold text-nord-11">
          Ingen API nyckel sparad, du kan inte uppdatera någon användare utan en
          giltig API nyckel.
        </p>
      )}
      {!user ? (
        <p>Välj en användare.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
          <label htmlFor="username">Användarnamn:</label>
          <input
            id="username"
            className={inputStyle}
            type="text"
            value={updatedUser.username || ""}
            onChange={updateProperty("username")}
          />
          <label htmlFor="eloRating">ELO:</label>
          <input
            id="eloRating"
            className={inputStyle}
            type="number"
            value={updatedUser.eloRating || ""}
            onChange={updateProperty("eloRating", true)}
          />
          <label htmlFor="steam32id">Steam id:</label>
          <input
            id="steam32id"
            className={inputStyle}
            type="text"
            value={updatedUser.steam32id || ""}
            onChange={updateProperty("steam32id")}
          />
          <label htmlFor="discordId">Discord id:</label>
          <input
            className={inputStyle}
            type="text"
            value={updatedUser.discordId || ""}
            onChange={updateProperty("discordId")}
          />
          <label htmlFor="discordUsername">Discord användarnamn:</label>
          <input
            id="discordUsername"
            className={inputStyle}
            type="text"
            value={updatedUser.discordUsername || ""}
            onChange={updateProperty("discordUsername")}
          />
          <input
            className="p-2 rounded uppercase font-bold cursor-pointer bg-nord-1 text-nord-8 hover:bg-nord-2"
            type="submit"
            value="Save"
          />
        </form>
      )}
    </div>
  );
}

export default UpdateUserInformation;
