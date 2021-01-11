import React, { useEffect, useState } from "react";

function UpdateUserInformation({ user }) {
  if (!user) {
    return <div>Select a user</div>;
  }

  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    setUpdatedUser({
      username: user.username,
      eloRating: user.eloRating || null,
      steam32id: user.steam32id || null,
      discordId: user.discordId || null,
      discordUsername: user.discordUsername || null,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("STORE IN DB THROUGH API");
  };

  const inputStyle = "p-2 mb-2 bg-nord-3 rounded";
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
        <label htmlFor="username">Username:</label>
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
        <label htmlFor="discordUsername">Discord username:</label>
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
    </div>
  );
}

export default UpdateUserInformation;
