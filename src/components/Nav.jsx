import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

function Nav() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [pollUrl, setPollUrl] = useState(
    // Default to document with all links
    "http://nextcloud.jacobadlers.com/index.php/s/nntLtmeAFytc3SW"
  );

  useEffect(() => {
    const fetchSignupLinks = async () => {
      try {
        const res = await fetch(`${baseUrl}/dota/signup`);
        if (!res.ok) {
          return;
        }

        const body = await res.json();
        if (body.currentPollUrl !== "") {
          setPollUrl(body.currentPollUrl);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (process.env.NODE_ENV !== "development") {
      fetchSignupLinks();
    }
  }, [baseUrl]);

  return (
    <nav>
      {/* Container */}
      <h1
        className="text-5xl text-center lg:text-left text-nord-5 font-semibold cursor-pointer mb-6"
        onClick={() => navigate("/")}
      >
        Kung DotA{" "}
        <span role="img" aria-label="Trophy">
          🏆
        </span>
      </h1>
      <div className="flex justify-between items-center lg:flex-row my-2">
        {/* Seasons */}
        <div>
          <button
            className="font-bold uppercase p-2 text-nord-9 hover:bg-nord-2 rounded mr-2"
            onClick={() => navigate("/league/2/0")}
          >
            Säsong 1
          </button>
          <button
            className="font-bold uppercase p-2 text-nord-9 hover:bg-nord-2 rounded"
            onClick={() => navigate("/league/2/1")}
          >
            Säsong 2
          </button>
        </div>
        {/* Other pages */}
        <div>
          <button
            className="font-bold uppercase p-2 text-nord-9 hover:bg-nord-2 rounded mr-2"
            onClick={() => navigate("/add-fb-phrase")}
          >
            Roasts
          </button>
          <a
            className="font-bold uppercase p-2 text-nord-8 hover:bg-nord-2 rounded"
            href={pollUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Anmälan
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
