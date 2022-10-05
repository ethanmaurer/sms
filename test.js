const http = require("http");
const express = require("express");
const { MessagingResponse } = require("twilio").twiml;

const app = express();

app.post("/", (req, res) => {
  const twiml = new MessagingResponse();

  console.log(req.body);
  const message = twiml.message();
  message.body("The Robots are coming! Head for the hills!");
  message.media("https://demo.twilio.com/owl.png");
  res.writeHead(200, { "Content-Type": "text/xml" });

  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log("listening on port 1337");
});
