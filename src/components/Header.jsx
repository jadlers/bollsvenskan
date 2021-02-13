import React from "react";
import { Link } from "@reach/router";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1 className="text-5xl text-center lg:text-left text-theme-text-primary font-semibold cursor-pointer mb-6">
          Kung DotA{" "}
          <span role="img" aria-label="Trophy">
            🏆
          </span>
        </h1>
      </Link>
    </header>
  );
}

export default Header;
