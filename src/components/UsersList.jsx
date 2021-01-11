import React, { useEffect } from "react";

function UsersList({ users, selectUser }) {
  users.sort((a, b) => a.id > b.id);
  return (
    <div>
      <p>List of users:</p>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="px-2 py-1 rounded uppercase cursor-pointer hover:bg-nord-2 font-bold text-nord-8"
            onClick={() => selectUser(user.id)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
