import React from "react";

/**
 * Used for number of times a player died *and* claimed firstblood.
 */
function FirstBloodTable({ title, data }) {
  return (
    <div className="bg-nord-1 lg:w-2/5 p-4 text-nord-5 rounded">
      <p className="font-bold text-center mb-2">{title}</p>
      <table className="w-full tabular-nums ">
        <thead className="font-semibold">
          <tr>
            <td>Namn</td>
            <td className="text-right">Antal</td>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-nord-3">
          {data
            .sort((a, b) => a.name > b.name)
            .sort((a, b) => b.amount - a.amount)
            .map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td className="text-right">{row.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default FirstBloodTable;
