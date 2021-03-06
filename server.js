const express = require("express");
const path = require("path");
const http = require("http");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const testApiRoute = require("./src/routes/test");

// Set up the app and server.
let app = express();
let server = http.createServer(app);

const PORT = 9000;

// Configure app.
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "resources")));

// Define routes.
app.use("/api", testApiRoute);

// Display the running port
app.get("/", (req, res) => {
  res.send(`Backend running on port ${PORT}`);
});

server.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
