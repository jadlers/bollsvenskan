import React from "react";

import ApiKeySetting from "../components/ApiKeySetting";

function Admin() {
  return (
    <div className="flex flex-col space-y-4 bg-nord-1 p-2 rounded text-nord-5">
      <p className="font-bold text-xl text-center">Admin page</p>
      <ApiKeySetting />
    </div>
  );
}

export default Admin;
