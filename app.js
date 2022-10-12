const http = require("http");
const port = 1338;
const hostname = "0.0.0.0";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, function (error) {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server running at port ` + port);
  }
});
