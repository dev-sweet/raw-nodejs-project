/*
 * Title: Uptime monitoring application
 * Description: A RESTful API for monitor up or down time of user defined links
 * Author: Sweet (dev sweet)
 * Date: 20/02/2023
 */

// dependencies
const http = require("http");
const { parse } = require("path");
const url = require("url");

// app object/ scafolding
const app = {};

// configeration
app.config = { port: 8000 };

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Node js running at port: ${app.config.port}`);
  });
};

// handle req
app.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObj = parsedUrl.query;
  const headers = req.headers;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);

    // handle res
    res.end(
      `Your are visiting '${trimmedPath}' and your method is ${method} and your query string is`
    );
  });
};

// start the server
app.createServer();
