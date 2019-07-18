// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const env = process.env.NODE_ENV || "development";
const db = require("mariadb");

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
exports.getAllPlayers = async (event, context) => {
  try {
    const conn = await getDbConnection();

    const res = await conn.query("SELECT * FROM users");
    response = {
      statusCode: 200,
      body: JSON.stringify({
        players: res,
      }),
    };
  } catch (err) {
    console.log({
      eventType: "DB",
      function: "getAllPlayers",
      err,
    });
    return err;
  }

  return response;
};

exports.addNewPlayer = async (event, context) => {
  const body = JSON.parse(event.body);
  const { username } = body;
  if (!username) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing key 'username' in request body",
        req: body,
      }),
    };
  }

  try {
    const conn = await getDbConnection();
    const res = await conn.query("INSERT INTO users(username) VALUES (?)", [
      username,
    ]);

    console.log({
      eventType: "DB",
      function: "addNewPlayer",
      message: `Added user ${username} with id ${res.insertId}`,
    });

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "User added successfully",
        userId: res.insertId,
      }),
    };
  } catch (err) {
    if (err.errno === 1062) {
      console.log({
        eventType: "DB",
        function: "addNewPlayer",
        message: `Error: User with username '${username}' already exists`,
      });
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `A user with that name already exists`,
        }),
      };
    }

    console.log({
      eventType: "DB",
      function: "addNewPlayer",
      err,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }

  return response;
};
