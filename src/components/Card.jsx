import React from "react";

export default function Card({ width, children }) {
  return (
    <div className={`bg-nord-1 rounded p-2 ${width || ""}`}>{children}</div>
  );
}
