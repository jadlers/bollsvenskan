import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { Button, ExternalLinkButton } from "./Buttons";

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
      <a>
        <h1
          className="text-5xl text-center lg:text-left text-nord-5 font-semibold cursor-pointer mb-6"
          onClick={() => navigate("/")}
        >
          Kung DotA{" "}
          <span role="img" aria-label="Trophy">
            🏆
          </span>
        </h1>
      </a>
      <div className="flex justify-between items-center lg:flex-row flex-col-reverse my-2">
        {/* Seasons */}
        <div className="flex">
          <Button
            variant="secondary"
            hoverBg="nord-1"
            onClick={() => navigate("/league/2/0")}
          >
            Säsong 1
          </Button>
          <Button
            variant="secondary"
            hoverBg="nord-1"
            onClick={() => navigate("/league/2/1")}
          >
            Säsong 2
          </Button>
          <Button
            variant="secondary"
            hoverBg="nord-1"
            onClick={() => navigate("/league/2/2")}
          >
            Säsong 3
          </Button>
        </div>
        {/* Other pages */}
        <div className="flex flex-row">
          <Button
            variant="secondary"
            hoverBg="nord-1"
            onClick={() => navigate("/add-fb-phrase")}
          >
            Roasts
          </Button>
          <ExternalLinkButton variant="primary" hoverBg="nord-1" href={pollUrl}>
            Anmälan
          </ExternalLinkButton>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
