const http = require("http");
const port = 1338;
const express = require("express");
const { send } = require("process");
const { MessagingResponse } = require("twilio").twiml;

const app = express();

const images = [
  "https://i.imgur.com/1Z1Z1Z1.jpg",
  "https://i.imgur.com/2Z2Z2Z2.jpg",
  "https://i.imgur.com/3Z3Z3Z3.jpg",
];

let currentImage = 0;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  const incoming = req.body.Body.toLowerCase();
  console.log("Checking for incoming message: " + incoming);

  if (incoming.includes("picture")) {
    twiml.media(images[currentImage]);
    currentImage++;
  } else if (incoming === "begin") {
    sendSMS(
      res,
      twiml,
      "The game has begun!\n\nDifficulty: Hard\n\nQuestion 1: Who is the most important person in our relationship?",
      null
    );
  } else if (incoming.includes("ur mom") || incoming.includes("your mom")) {
    sendSMS(res, twiml, "no, YOUR MOM!\n\n\nha got em", null);
  } else if (incoming.includes("jesus")) {
    sendSMS(
      res,
      twiml,
      "Good job!\nThat one was easy.\n\n\nNow it's time to head back to your apartment\n\ntext 'here' when you get there",
      null
    );
  } else if (incoming === "here") {
    sendSMS(
      res,
      twiml,
      "Noice, you made it back\n\n\nNext question:\nWhat is the reference of our life verse?"
    );
  } else if (incoming === "1 john 4:12") {
    sendSMS(
      res,
      twiml,
      "You got it right!\nBut can you recite it?\n\n\nNow we gotta dress up in fannncyyyy clothes! yaaay FANCY!\n\ntext 'fantabulous' when you're ready"
    );
  } else if (incoming.includes("fantabulous")) {
    sendSMS(
      res,
      twiml,
      "You look sooo pretty!!\n\n\nOk next question:\nWhat flavor of ice cream did we get on our first date?",
      null
    );
  } else if (incoming.includes("pumkin")) {
    sendSMS(
      res,
      twiml,
      "Yay good job!\n\n\nHere's where we are going next:\n3806 Schofield Ave, Weston, WI 54476\n\ntext 'we're here' when you get there",
      null
    );
  } else if (incoming.includes("we're here")) {
    sendSMS(
      res,
      twiml,
      "You made it!\n\n\nRIDDLE TIME!\n\nWhat has many teeth, but cannot bite?",
      null
    );
  } else if (incoming.includes("a comb")) {
    sendSMS(
      res,
      twiml,
      "Yay you got it!!\n\n\nOk now go eat some tasty food!\n\ntext 'Mmm tasty' when you're done",
      null
    );
  } else if (incoming.includes("mm tasty")) {
    sendSMS(
      res,
      twiml,
      "Hope the food was good!!\n\nRiddle time again!\n\nWhat has an eye but cannot see?",
      null
    );
  } else if (incoming.includes("a needle")) {
    sendSMS(
      res,
      twiml,
      "Good job love!\nbtw you look soooo pretty!\n\nWhen is our wedding date?",
      null
    );
  } else if (incoming.includes("june 30")) {
    sendSMS(
      res,
      twiml,
      "Yeah! I can't frickin wait for it either! :)\n\n\nOk now we gonna go somewhere else what kind of dessert do you want? (Chocolate or Ice Cream)",
      null
    );
  } else if (incoming.includes("chocolate")) {
    sendSMS(
      res,
      twiml,
      "yeah chocolate!\n\nGo here for chocolate\n615 N 3rd Street, Wausau, WI 54403\ntext 'yum yum' after you've gotten your chocolate",
      null
    );
  } else if (incoming.includes("ice cream")) {
    sendSMS(
      res,
      twiml,
      "ICE CREAM!\n\nGo here for ice cream\n1605 Merrill Ave, Wausau, WI 54401\ntext 'creamy ice' after you've gotten your ice cream :)",
      null
    );
  } else if (incoming.includes("creamy ice") || incoming.includes("yum yum")) {
    sendSMS(
      res,
      twiml,
      "DESERT IS GOOD!\n\n\nWhere is our favorite place to go on a date?",
      null
    );
  } else if (incoming.includes("noodles")) {
    sendSMS(
      res,
      twiml,
      "Yeah the nooodssss!!! WOOOO!\n\n\nRIDDLE TIME!\n\nWhat has a head and a tail, but no body?",
      null
    );
  } else if (incoming.includes("a coin")) {
    sendSMS(
      res,
      twiml,
      "Yay you got it, you're so smart!!\n\n\nOk now we gotta go somewhere else!\n149801 State Park Rd, Wausau, WI 54401",
      null
    );
  } else {
    sendSMS(res, twiml, "Invalid input, try again ya frickin muffin", null);
  }

  res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT || 5000, () => {
  console.log("listening on port: ", process.env.PORT || 5000);
});

function sendSMS(res, twiml, messageToSend, image) {
  const message = twiml.message();
  message.body(messageToSend);
  if (image) {
    message.media(image);
  }
  res.writeHead(200, { "Content-Type": "text/xml" });
}
/*
Message: begin
Response: The game has begun. 
Response: Difficulty: Hard 
Response: This game requires the utmost skill and intelligence.
You must answer a trivia question correctly to move on to the next question/task

Q1) 
1) Go dress fancy
2) Go to tine and cellar 3806 Schofield Ave, Weston, WI 54476
3) Go to Rib mountain


lapum park? /images/menu/2022/Dinner_Menu_2022_WAU.pdf
*/
