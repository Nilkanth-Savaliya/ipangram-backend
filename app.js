const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const env = require("dotenv");
const cors = require("cors");
env.config();

app.use(
  cors({
    origin: ["*", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

// mongo connection
const { connection } = require("./api/v1/services/connection");
connection();

// router
const mainRouter = require("./api");

app.use("/", mainRouter);

// listen server
server.listen(process.env.PORT, () => {
  console.log("user service is running on ", process.env.PORT);
});
