import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { Button, ExternalLinkButton } from "./Buttons";

import ThemeToggler from "./ThemeToggler";

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
      <div className="flex justify-between items-center lg:flex-row flex-col-reverse my-2">
        {/* Seasons */}
        <div className="flex flex-row md:hidden w-full justify-around">
          {[1, 2, 3, 4, 5, 6].map((season) => (
            <Button
              onClick={() => navigate(`/league/2/${season - 1}`)}
              variant="secondary"
              hoverBg="theme-background-1"
              key={season}
            >
              {`${season}`}
            </Button>
          ))}
        </div>
        <p className="md:hidden">Välj säsong</p>
        <div className="flex flex-row hidden md:block">
          {[1, 2, 3, 4, 5, 6].map((season) => (
            <Button
              variant="secondary"
              hoverBg="theme-background-1"
              onClick={() => navigate(`/league/2/${season - 1}`)}
              key={season}
            >
              {`Säsong ${season}`}
            </Button>
          ))}
        </div>
        {/* Other pages */}
        <div className="flex flex-row items-center">
          <ThemeToggler />
          <Button
            variant="secondary"
            hoverBg="theme-background-1"
            onClick={() => navigate("/add-fb-phrase")}
          >
            Roasts
          </Button>
          <ExternalLinkButton
            variant="primary"
            hoverBg="theme-background-1"
            href={pollUrl}
          >
            Anmälan
          </ExternalLinkButton>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
