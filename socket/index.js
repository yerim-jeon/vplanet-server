const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const needle = require("needle");

const { STREAM_URL, EVENTS } = require("../constants");
const { getAllRules, deleteAllRules, setRules } = require("../util");

const token = process.env.TOKEN;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  }
});

let tweetCount = 0;

io.on("connection", (socket) => {
  const rules = [{
    value: "",
    tag: ""
  }];

  socket.on(EVENTS.JOIN, (msg) => {
    console.log(msg);
  });

  socket.on(EVENTS.KEYWORD, async (searchKeyword) => {
    rules[0].value = searchKeyword;
    rules[0].tag = searchKeyword;

    let currentRules;

    try {
      currentRules = await getAllRules();
      await deleteAllRules(currentRules);
      await setRules(rules);
    } catch (error) {
      console.log(error);
    }

    const streamConnect = async () => {
      const stream = needle.get(STREAM_URL, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        timeout: 0
      });

      stream.on("data", async (data) => {
        try {
          const json = JSON.parse(data);

          tweetCount++;

          if (tweetCount > 10) {
            stream.destroy();
            tweetCount = 0;
            return;
          }

          socket.emit(EVENTS.DATA, json);
        } catch (error) {
          if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
            console.log(data.detail);
          } else {
          }
        }
      }).on("error", error => {
        if (error.code !== "ECONNRESET") {
          console.log(error.code);
        }
      });

      return stream;
    };

    streamConnect(0);
  });
});

module.exports = io;
