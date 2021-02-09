import React from "react";

// NOTE: Only renders one of `title` and `Header` will be rendered. The `Header`
// takes precedence.
export default function Card({ children, Header, title }) {
  const renderHeader = Header !== undefined;
  const renderTitle = !Header && title !== undefined;

  return (
    <div className="bg-nord-1 p-2">
      {renderHeader && <Header />}
      {renderTitle && <p className="text-xl font-bold mb-2">{title}</p>}
      {children}
    </div>
  );
}
