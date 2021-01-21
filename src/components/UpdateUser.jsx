import React, { useState } from "react";

import UpdateUserInformation from "../components/UpdateUserInformation";
import UsersList from "../components/UsersList";

function UpdateUser({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex flex-row space-x-4">
      <div>
        <p>Lista med alla användare:</p>
        <UsersList users={users} selectUser={setSelectedUser} />
      </div>
      <UpdateUserInformation user={users.find((u) => u.id === selectedUser)} />
    </div>
  );
}

export default UpdateUser;
