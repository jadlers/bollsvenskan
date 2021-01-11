import React from "react";
import { Router, Link } from "@reach/router";

import ApiKeySetting from "../components/ApiKeySetting";
import UpdateUser from "../components/UpdateUser";

function Admin({ players: users }) {
  const buttonClasses =
    "p-2 rounded hover:bg-nord-2 uppercase font-bold text-nord-9";

  return (
    <div className="flex flex-col space-y-4 bg-nord-1 p-2 rounded text-nord-5">
      <div className="flex flex-row justify-between">
        <p className="py-2 font-bold text-xl text-center">Admin page</p>
        <nav className="flex flex-row space-x-2">
          <Link className={buttonClasses} to="api-key">
            API key
          </Link>
          <Link className={buttonClasses} to="update-user">
            Update user
          </Link>
        </nav>
      </div>
      <Router>
        <ApiKeySetting path="api-key" />
        <UpdateUser path="update-user" users={users} />
      </Router>
    </div>
  );
}

export default Admin;
