import React, { useEffect, useState } from "react";

function ThemeToggler() {
  // TODO: Check localstorage when setting initially
  const [theme, setTheme] = useState("light");
  const nextTheme = theme === "light" ? "dark" : "light";

  const toggleTheme = () => setTheme(nextTheme);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div
      className="p-1 cursor-pointer opacity-75 hover:opacity-100"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </div>
  );
}

export default ThemeToggler;
