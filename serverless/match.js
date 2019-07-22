const env = process.env.NODE_ENV || "development";
const db = require("mariadb");
const Joi = require("@hapi/joi");

let response;

getDbConnection = async () => {
  return await db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.addNewMatch = async (event, context) => {
  const body = JSON.parse(event.body);

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Under development",
    }),
  };

  // 1. Validate data needed exists
  const schema = Joi.object().keys({
    teams: Joi.array()
      .items(
        Joi.array()
          .items(Joi.number())
          .min(1)
      )
      .min(2)
      .required(),
    score: Joi.array()
      .items(Joi.number())
      .min(2)
      .required(),
    winner: Joi.number()
      .min(0)
      .required(),
  });

  try {
    await Joi.validate(body, schema, { abortEarly: false });
  } catch (error) {
    const errorInformation = error.details.map(
      d => d.message.replace(/\"/g, `'`) + " "
    );

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `${error.name}: ${errorInformation}`,
      }),
    };
  }

  // All data needed is valid
  const { teams, score, winner } = body;

  // 2. Add to DB
  let conn;
  try {
    conn = await getDbConnection();
    // Open a transaction
    conn.query("START TRANSACTION");

    // Add players to teams
    let teamIds = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const res = await conn.query("INSERT INTO teams() VALUES ()");
      teamIds[i] = res.insertId;

      for (let j = 0; j < team.length; j++) {
        const player = team[j];
        const res = await conn.query(
          "INSERT INTO team_players(team_id, user_id) VALUES (?, ?)",
          [teamIds[i], player]
        );
      }
    }

    // Add match information
    const res = await conn.query(
      "INSERT INTO matches (score, winning_team_id) VALUES (?, ?)",
      [`${score[0]} - ${score[1]}`, teamIds[winner]]
    );
    const matchId = res.insertId;

    // Connect match with teams using match_teams
    await teamIds.forEach(
      async teamId =>
        await conn.query(
          "INSERT INTO match_teams (match_id, team_id) VALUES (?, ?)",
          [matchId, teamId]
        )
    );

    conn.query("COMMIT");
    console.log({
      eventType: "DB",
      function: "addNewMatch",
      message: "Added match with information shown in data",
      data: body,
    });
    response = {
      statusCode: 200,
      body: JSON.stringify("Successfully added new match"),
    };
  } catch (error) {
    if (conn) {
      conn.query("ROLLBACK");
    }
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal error adding new match",
      }),
    };
  }

  return response;
};

exports.getAllMatches = async (event, context) => {
  response = {
    statusCode: 201,
    body: JSON.stringify({ message: "In development" }),
  };

  try {
    const conn = await getDbConnection();

    const matches = await conn.query("SELECT * FROM matches");
    const example = [
      { id: 1, date: null, score: "3 - 1", winning_team_id: 15 },
      { id: 2, date: null, score: "3 - 1", winning_team_id: 17 },
      { id: 3, date: null, score: "2 - 3", winning_team_id: 20 },
      { id: 4, date: null, score: "2 - 3", winning_team_id: 22 },
    ];

    const final = [];
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];

      const matchObj = { matchId: match.id, teams: [] };

      // Format the score
      const { id, score, winning_team_id } = match;
      const score_arr = score.split("-").map(n => parseInt(n));
      matchObj.score = score_arr;

      // Get all teams in the match
      const teamIds = await conn.query(
        "SELECT team_id FROM match_teams WHERE match_id = ?",
        id
      );

      const teams = [];

      for (let j = 0; j < teamIds.length; j++) {
        const row = teamIds[j];
        // Get names
        const teamId = row.team_id;
        const playerNames = await getPlayerNamesFromTeamId(teamId);
        matchObj.teams.push(playerNames);
        if (teamId === winning_team_id) {
          matchObj.winner = matchObj.teams.indexOf(playerNames);
        }
      }

      final.push(matchObj);
    }
    response = {
      statusCode: 200,
      body: JSON.stringify({ matches: final }),
    };
  } catch (error) {
    console.log(error);
  }

  return response;
};

const getPlayerNamesFromTeamId = async teamId => {
  try {
    const conn = await getDbConnection();

    const res = await conn.query(
      "SELECT user_id FROM team_players WHERE team_id = ?",
      teamId
    );
    const userIds = res.map(row => parseInt(row.user_id));
    let players = [];

    const nameData = await conn.query(
      `SELECT username FROM users WHERE id IN (${userIds.toString()})`
    ); // TODO: Safe?
    const names = nameData.map(p => p.username);
    return names;
  } catch (error) {
    console.log(error);
  }
  return [];
};
