import React from "react";
import { CardButton } from "./Buttons";

function UsersList({ users, selectUser }) {
  users.sort((a, b) => a.username > b.username);
  return (
    <div>
      <p>Lista med användare:</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <CardButton size="small" onClick={() => selectUser(user.id)}>
              {user.username}
            </CardButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
