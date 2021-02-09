import React from "react";
import { leftZeroPad, getHeroIcon } from "../util";
import Card from "./Card";
import { ExternalLinkButton } from "./Buttons";

function PlayerMatchStatsTable({ teams, winnerIdx }) {
  const victorySpan = <span className="text-nord-14">Vinst</span>;
  const lossSpan = <span className="text-nord-11">Förlust</span>;

  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full tabular-nums text-right">
        <thead className="text-nord-9">
          <tr>
            <td className="w-px"></td>
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
              <React.Fragment key={idx}>
                <tr className="font-semibold">
                  <td colSpan="1" className="text-center text-xl py-2">
                    {idx === 0 ? `Radiant` : `Dire`}
                  </td>
                  <td colSpan="8" className="text-center text-xl py-2">
                    {idx === winnerIdx ? victorySpan : lossSpan}
                  </td>
                </tr>
                {team.map((player) => {
                  const [heroIconSrc, heroIconAlt] = getHeroIcon(
                    player.stats.dota_hero_id
                  );

                  return (
                    <tr key={player.name} className="hover:bg-nord-2">
                      <td className="py-2 pl-4">
                        <img
                          height="32"
                          width="32"
                          src={heroIconSrc}
                          loading="lazy"
                          title={heroIconAlt}
                          alt={`Icon of ${heroIconAlt}`}
                        />
                      </td>
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
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FirstBloodHighlight({ type, phrase, user }) {
  if (!Array.isArray(phrase)) {
    phrase = phrase.split("<name>");
  }
  return (
    <div className="flex flex-row">
      {type === "mock" ? (
        <span className="mr-2 flex-none" role="img" aria-label="skull">
          💀
        </span>
      ) : (
        <span className="mr-2" role="img" aria-label="gun">
          🔫
        </span>
      )}
      <p>
        {phrase[0]}
        <span className="font-bold">{user ? user.name : "???"}</span>
        {phrase[1]}
        {type === "mock" && " och dog first blood. "}
      </p>
    </div>
  );
}

export function FirstBloodHighlights({ mock, praise, died, claimed }) {
  return (
    <div>
      <FirstBloodHighlight type="mock" phrase={mock} user={died} />
      {claimed && (
        <FirstBloodHighlight type="praise" phrase={praise} user={claimed} />
      )}
    </div>
  );
}

function MatchDetails({ match, no }) {
  const d = new Date(match.date);
  const month = leftZeroPad(d.getMonth() + 1, 2);
  const day = leftZeroPad(d.getDate(), 2);
  const hour = leftZeroPad(d.getHours(), 2);
  const minute = leftZeroPad(d.getMinutes(), 2);
  const dateString = `${d.getFullYear()}-${month}-${day} ${hour}:${minute}`;

  return (
    <Card>
      <div className="flex flex-col justify-between space-y-4">
        <div className="flex justify-between font-bold text-lg">
          <span>{`Match ${no}`}</span>
          <span className="text-nord-9">{dateString}</span>
        </div>
        <FirstBloodHighlights
          died={match.teams.flat().find((p) => p.id === match.diedFirstBlood)}
          claimed={match.teams
            .flat()
            .find((p) => p.id === match.claimedFirstBlood)}
          mock={match.firstBloodMock}
          praise={match.firstBloodPraise}
          dotaMatchId={match.dotaMatchId}
        />
        <PlayerMatchStatsTable teams={match.teams} winnerIdx={match.winner} />
        <div className="flex flex-row-reverse">
          <ExternalLinkButton
            variant="primary"
            hoverBg="nord-2"
            href={`https://www.opendota.com/matches/${match.dotaMatchId}`}
          >
            Opendota
          </ExternalLinkButton>
        </div>
      </div>
    </Card>
  );
}

export default MatchDetails;
