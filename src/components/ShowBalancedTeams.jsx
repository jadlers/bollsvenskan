import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";

import UnsettledName from "./UnsettledName";

const baseUrl = process.env.REACT_APP_API_URL;
let client;

export default function RevealTeams(props) {
  const [teams, setTeams] = useState([]);
  const [remainingPlayers, setRemainingPlayers] = useState([]);

  useEffect(() => {
    client = new W3CWebSocket(`${baseUrl.replace("http", "ws")}/teams`);
    client.onopen = (msg) =>
      console.log(`Connection to ${msg.target.url} established`);
    client.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.type === "BROADCAST_TEAM_PLAYERS_ONE_BY_ONE") {
          setTeams([data.team1, data.team2]);
          setRemainingPlayers(data.playersLeft);
        }
      } catch (err) {
        console.log(err);
        return;
      }
    };

    // Close the connection when unmounting component
    return () => client.close();
  }, []);

  return (
    <Card>
      <CardContent>
        {teams.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Väntar på att spelare för lagen väljs
            </Typography>
            <Fade
              in={teams.length === 0}
              timeout={{ appear: 800 }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(teams).map((team, idx) => {
              return (
                <div key={idx}>
                  <p>{`Genomsnittlig ELO: ${
                    team[1].rating ? team[1].rating.toFixed(2) : "-"
                  }`}</p>
                  <ul>
                    {team[1].players.map((player) => (
                      <li key={`${team[0]}-${player}`}>{player}</li>
                    ))}
                    {team[1].players.length < team[1].numPlayers
                      ? [
                          ...Array(
                            team[1].numPlayers - team[1].players.length
                          ).keys(),
                        ].map((_, idx) => (
                          <UnsettledName
                            key={`${team[0]}-${idx}`}
                            names={remainingPlayers}
                          />
                        ))
                      : ""}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
