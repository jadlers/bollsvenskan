import React from "react";
import { leftZeroPad } from "../util";

function PlayerMatchStatsTable({ teams, winnerIdx }) {
  const victorySpan = <span className="text-nord-14">Vinst</span>;
  const lossSpan = <span className="text-nord-11">Förlust</span>;

  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full tabular-nums text-right">
        <thead className="text-nord-9">
          <tr>
            <td className="text-left">Namn</td>
            <td>K</td>
            <td>D</td>
            <td>A</td>
            <td>FP</td>
            <td>OP</td>
            <td>OD</td>
            <td>SP</td>
            <td>SD</td>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-nord-3">
          {teams.map((team, idx) => {
            return (
              <>
                <tr className="font-semibold">
                  <td colSpan="1" className="text-center text-xl py-2">
                    {idx === 0 ? `Radiant` : `Dire`}
                  </td>
                  <td colSpan="8" className="text-center text-xl py-2">
                    {idx === winnerIdx ? victorySpan : lossSpan}
                  </td>
                </tr>
                {team.map((player) => (
                  <tr key={player.name} className="hover:bg-nord-2">
                    <td className="text-left w-1/6">{player.name}</td>
                    <td className="text-right lg:py-2">
                      {player.stats.kills || 0}
                    </td>
                    <td className="text-right lg:py-2">
                      {player.stats.deaths || 0}
                    </td>
                    <td className="text-right lg:py-2">
                      {player.stats.assists || 0}
                    </td>
                    <td className="text-right lg:py-2">
                      {player.stats.fantasy_points || 0}
                    </td>
                    <td className="text-right lg:py-2">
                      {player.stats.observers_placed || 0}
                    </td>
                    <td className="text-right lg:py-2">
                      {player.stats.observers_destroyed || 0}
                    </td>
                    <td className="text-right lg:py-2">
                      {player.stats.sentries_placed || 0}
                    </td>
                    <td className="text-right lg:py-2">
                      {player.stats.sentries_destroyed || 0}
                    </td>
                  </tr>
                ))}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function FirstBloodHighlight({ mock, praise, died, claimed }) {
  if (!Array.isArray(mock)) {
    mock = mock.split("<name>");
  }
  if (!Array.isArray(praise)) {
    praise = praise.split("<name>");
  }

  return (
    <p>
      {mock[0]}
      <span className="font-bold">{died ? died.name : "???"}</span>
      {mock[1]}
      {" och dog first blood. "}
      {claimed ? (
        <>
          {praise[0]}
          <span className="font-bold">{claimed.name}</span>
          {praise[1]}
        </>
      ) : (
        ""
      )}
    </p>
  );
}

function MatchDetails({ match, no }) {
  const d = new Date(match.date);
  const dateString = `${d.getFullYear()}-${leftZeroPad(
    d.getMonth() + 1,
    2
  )}-${leftZeroPad(d.getDate(), 2)} ${leftZeroPad(
    d.getHours(),
    2
  )}:${leftZeroPad(d.getMinutes(), 2)}`;

  return (
    <div className="bg-nord-1 rounded shadow p-4 text-nord-4">
      <div className="flex justify-between mb-4 font-bold text-lg">
        <span>{`Match ${no}`}</span>
        <span className="text-nord-9">{dateString}</span>
      </div>
      <FirstBloodHighlight
        died={match.teams.flat().find((p) => p.id === match.diedFirstBlood)}
        claimed={match.teams
          .flat()
          .find((p) => p.id === match.claimedFirstBlood)}
        mock={match.firstBloodMock}
        praise={match.firstBloodPraise}
        dotaMatchId={match.dotaMatchId}
      />
      <PlayerMatchStatsTable teams={match.teams} winnerIdx={match.winner} />
      <div className="flex flex-row-reverse mt-4">
        <a
          className="font-bold uppercase text-nord-8 p-2 rounded hover:bg-nord-2"
          href={`https://www.opendota.com/matches/${match.dotaMatchId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Opendota
        </a>
      </div>
    </div>
  );
}

export default MatchDetails;
