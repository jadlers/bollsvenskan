import React from "react";
import { Router } from "@reach/router";

import AddUser from "../components/AddUser";
import ApiKeySetting from "../components/ApiKeySetting";
import Card from "../components/Card";
import { RouterLinkButton } from "../components/Buttons";
import UpdateUser from "../components/UpdateUser";

function Admin({ players: users }) {
  return (
    <Card Header={AdminNav}>
      <Router>
        <ApiKeySetting path="api-key" />
        <UpdateUser path="update-user" users={users} />
        <AddUser path="add-user" />
      </Router>
    </Card>
  );
}

function AdminNav() {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between">
      <p className="py-2 font-bold text-xl text-center">Admin sida</p>
      <nav className="flex lg:flex-row flex-col lg:space-x-2 text-center">
        <RouterLinkButton hoverBg="nord-2" variant="secondary" to="api-key">
          API Nyckel
        </RouterLinkButton>
        <RouterLinkButton hoverBg="nord-2" variant="secondary" to="update-user">
          Ändra användare
        </RouterLinkButton>
        <RouterLinkButton hoverBg="nord-2" variant="secondary" to="add-user">
          Ny användare
        </RouterLinkButton>
      </nav>
    </div>
  );
}

export default Admin;
