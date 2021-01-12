import React from "react";

function UsersList({ users, selectUser }) {
  users.sort((a, b) => a.username > b.username);
  return (
    <div>
      <p>Lista med användare:</p>
      <ul className="space-y-1">
        {users.map((user) => (
          <li key={user.id}>
            <a
              className="px-2 py-1 rounded uppercase cursor-pointer hover:bg-nord-2 font-bold text-nord-8"
              onClick={() => selectUser(user.id)}
            >
              {user.username}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
