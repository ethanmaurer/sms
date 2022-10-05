// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC67fb5579e3a39ada870e31579b1bf32f";
const authToken = "e7af6a6b1c30f7ea12820cae85ab8700";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    from: "+13024053598",
    to: "+16086321672",
  })
  .then((message) => console.log(message.sid))
  .catch((error) => {
    console.log(error);
  });
