import React from "react";
import { Router, Link } from "@reach/router";

import AddUser from "../components/AddUser";
import ApiKeySetting from "../components/ApiKeySetting";
import Card from "../components/Card";
import UpdateUser from "../components/UpdateUser";

function Admin({ players: users }) {
  const buttonClasses =
    "p-2 rounded hover:bg-nord-2 uppercase font-bold text-nord-9";

  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between">
          <p className="py-2 font-bold text-xl text-center">Admin sida</p>
          <nav className="flex flex-row space-x-2">
            <Link className={buttonClasses} to="api-key">
              API Nyckel
            </Link>
            <Link className={buttonClasses} to="update-user">
              Ändra användare
            </Link>
            <Link className={buttonClasses} to="add-user">
              Ny användare
            </Link>
          </nav>
        </div>
        <Router>
          <ApiKeySetting path="api-key" />
          <UpdateUser path="update-user" users={users} />
          <AddUser path="add-user" />
        </Router>
      </div>
    </Card>
  );
}

export default Admin;
