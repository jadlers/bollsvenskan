import React from "react";

function PlayerMatchStatsTable(props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full tabular-nums text-right">
        <thead>
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
          {props.teamStats.map((player) => (
            <tr key={player.name} className="hover:bg-nord-2">
              <td className="text-left w-1/6">{player.name}</td>
              <td className="text-right lg:py-2">{player.stats.kills || 0}</td>
              <td className="text-right lg:py-2">{player.stats.deaths || 0}</td>
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

function MatchDetails(props) {
  const { match } = props;

  const victorySpan = <span className="text-nord-14">Vinst</span>;
  const lossSpan = <span className="text-nord-11">Förlust</span>;

  return (
    <div className="bg-nord-1 rounded shadow p-4 mb-6 text-nord-4">
      <p className="font-bold mb-2">{`Match ${props.no}`}</p>
      <FirstBloodHighlight
        died={match.teams.flat().find((p) => p.id === match.diedFirstBlood)}
        claimed={match.teams
          .flat()
          .find((p) => p.id === match.claimedFirstBlood)}
        mock={match.firstBloodMock}
        praise={match.firstBloodPraise}
        dotaMatchId={match.dotaMatchId}
      />
      {match.teams.map((team, idx) => {
        return (
          <div className="my-2" key={`${props.no}-team${idx}`}>
            <h4>
              Lag {idx + 1} - {idx === match.winner ? victorySpan : lossSpan}
            </h4>
            <PlayerMatchStatsTable teamStats={team} />
          </div>
        );
      })}
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
