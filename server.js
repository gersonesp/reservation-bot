const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const bodyParser = require("body-parser");
const request = require("request");
const { clientId, clientSecret } = require("./secrets");
const database = require("./db.js");
const Reservations = require("./db.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let reservations = [];

let opentime = 10.0;
let closetime = 20.0;

function checktime(time) {
  return time >= opentime && time + 1 <= closetime;
}

function checkday(day) {
  return day >= 1 && day <= 31;
}
function checkmonth(month) {
  return month >= 1 && month <= 12;
}
function checkyear(year) {
  return year >= 2019;
}

app.get("/reservations", function(req, res) {
  res.json(reservations);
});

let input;

app.post("/", async (req, res, next) => {
  const twiml = new MessagingResponse();

  if (req.body.response_url && req.body.response_url.includes("slack")) {
    input = req.body.text.split(" ");
  } else {
    input = req.body.Body.split(" ");
  }

  if (
    input.length !== 8 &&
    checktime(input[3]) &&
    checkday(input[4]) &&
    checkmonth(input[5]) &&
    checkyear(input[6])
  ) {
    console.log("error");
    twiml.message("error");
  } else {
    let s =
      input[6] + "-" + input[5] + "-" + input[4] + input[3] + ":00:00.000Z";
    let reservation = {
      firstname: input[0],
      lastname: input[1],
      partysize: input[2],
      time: input[3],
      day: input[4],
      month: input[5],
      year: input[6],
      isodate: s
    };

    twiml.message("success");

    reservations.push(reservation);

    console.log(reservations);
    reservations.sort((a, b) => (a.isodate > b.isodate ? 1 : -1));
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get("/oauth", function(req, res) {
  // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
  if (!req.query.code) {
    res.status(500);
    res.send({ Error: "Looks like we're not getting code." });
    console.log("Looks like we're not getting code.");
  } else {
    // If it's there...

    // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
    request(
      {
        url: "https://slack.com/api/oauth.access", //URL to hit
        qs: {
          code: req.query.code,
          client_id: clientId,
          client_secret: clientSecret
        }, //Query string data
        method: "GET" //Specify the method
      },
      function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          console.log(body);
          res.json(body);
        }
      }
    );
  }
});

database.db.authenticate().then(() => {
  console.log("connected to the database");
});

const init = async function() {
  await database.db.sync();

  http.createServer(app).listen(1337, () => {
    console.log("express server listening on port 1337");
  });
};

init();
