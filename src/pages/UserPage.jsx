import React from "react";

import UsersList from "../components/UsersList";
import UserKungDotaStats from "../components/UserKungDotaStats";

function UserPage({ userId, users, navigate }) {
  userId = parseInt(userId);
  const user = users.find((u) => u.id === userId);

  const kungDotaStats = user?.stats.filter((s) => s.leagueId === 2) || [];

  return (
    <div className="flex container bg-nord-1 rounded p-2 text-nord-4 mx-auto space-x-4">
      <UsersList
        users={users}
        selectUser={(userId) => navigate(user ? `../${userId}` : `${userId}`)}
      />
      {user && (
        <div className="space-y-2">
          <p className="text-xl font-bold">{user.username}</p>
          <UserKungDotaStats stats={kungDotaStats} />
        </div>
      )}
    </div>
  );
}

export default UserPage;
