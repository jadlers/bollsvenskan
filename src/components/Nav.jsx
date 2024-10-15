import React from "react";
import { navigate } from "@reach/router";
import { Button } from "./Buttons";

import ThemeToggler from "./ThemeToggler";

function Nav() {
  const seasons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <nav>
      <div className="flex justify-between items-center lg:flex-row flex-col-reverse my-2">
        {/* Seasons */}
        <div className="flex flex-row md:hidden w-full justify-around">
          {seasons.map((season) => (
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
          {seasons.map((season) => (
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
        </div>
      </div>
    </nav>
  );
}

export default Nav;
