import React, { useState } from "react";

import ApiKeySetting from "../components/ApiKeySetting";
import UpdateUserInformation from "../components/UpdateUserInformation";
import UsersList from "../components/UsersList";

function Admin({ players: users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex flex-col space-y-4 bg-nord-1 p-2 rounded text-nord-5">
      <p className="font-bold text-xl text-center">Admin page</p>
      <ApiKeySetting />
      <div className="flex flex-row space-x-4">
        <UsersList users={users} selectUser={setSelectedUser} />
        <UpdateUserInformation
          user={users.find((u) => u.id === selectedUser)}
        />
      </div>
    </div>
  );
}

export default Admin;
