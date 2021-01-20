import React, { useState } from "react";
import useStoredSetting from "../hooks/useStoredSetting";

function ApiKeySetting() {
  const [apiKey, setApiKey] = useStoredSetting("apiKey");
  const [keyInput, setKeyInput] = useState("");

  const saveKey = (e) => {
    e.preventDefault();
    setApiKey(keyInput);
  };

  return apiKey ? (
    <div className="flex md:flex-row flex-col md:justify-center md:space-x-2 md:space-y-0 space-y-2">
      <p className="inline py-2 md:text-left text-center">
        Du har följande API nyckel sparad:
      </p>
      <span
        className={`ml-2 p-2 font-semibold border border-nord-7
                        md:text-left text-center
                        bg-nord-7 hover:bg-nord-1 text-nord-7 hover:text-nord-6
                        transition-colors duration-500`}
      >
        {apiKey}
      </span>
      <button
        className="p-2 rounded hover:bg-nord-2 text-nord-8 font-bold uppercase cursor-pointer"
        onClick={() => setApiKey(null)}
      >
        Rensa
      </button>
    </div>
  ) : (
    <form
      className="flex flex-row space-x-2 w-full max-w-screen-sm"
      onSubmit={saveKey}
    >
      <input
        className="bg-nord-3 p-2 flex-grow rounded"
        type="text"
        value={keyInput}
        placeholder="Skriv in din API nyckel"
        onChange={(e) => setKeyInput(e.target.value.trim())}
        onSubmit={saveKey}
      />
      <input
        className="p-2 rounded bg-nord-1 hover:bg-nord-2 text-nord-8 font-bold uppercase cursor-pointer"
        type="submit"
        value="Spara"
      />
    </form>
  );
}

export default ApiKeySetting;
