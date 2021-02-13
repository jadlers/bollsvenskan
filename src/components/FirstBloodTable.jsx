import React from "react";
import Card from "./Card";

/**
 * Used for number of times a player died *and* claimed firstblood.
 */
function FirstBloodTable({ title, data }) {
  return (
    <Card title={title}>
      <table className="w-full tabular-nums ">
        <thead className="font-semibold">
          <tr>
            <td>Namn</td>
            <td className="text-right">Antal</td>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-theme-background-2">
          {data
            .sort((a, b) => a.name > b.name)
            .sort((a, b) => b.amount - a.amount)
            .map((row) => (
              <tr key={row.name} className="hover:bg-theme-background-2">
                <td>{row.name}</td>
                <td className="text-right">{row.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  );
}

export default FirstBloodTable;
