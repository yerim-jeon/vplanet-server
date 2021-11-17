const express = require("express");
const router = express.Router();
const needle = require("needle");

const rulesURL = process.env.RULES_URL;
const streamURL = process.env.STREAM_URL;
const token = process.env.TOKEN;

router.post("/postSearch", async (req, res, next) => {
  const { keyword } = req.body;

  const tweetList = [];

  const rules = [{
    "value": `${keyword}`,
    "tag": `${keyword}`
  }];

  const getAllRules = async () => {
    const response = await needle("get", rulesURL, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    });

    if (response.statusCode !== 200) {
      console.log("Error:", response.statusMessage, response.statusCode)
      throw new Error(response.body);
    }

    return (response.body);
  };

  const deleteAllRules = async (rules) => {
    if (!Array.isArray(rules.data)) {
      return null;
    }

    const ids = rules.data.map(rule => rule.id);

    const data = {
      "delete": {
        "ids": ids
      }
    };

    const response = await needle("post", rulesURL, data, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });

    if (response.statusCode !== 200) {
      throw new Error(response.body);
    }

    return (response.body);
  }

  const setRules = async () => {
    const data = {
      "add": rules
    };

    const response = await needle("post", rulesURL, data, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });

    if (response.statusCode !== 201) {
      throw new Error(response.body);
    }

    return (response.body);
  };

  const streamConnect = async (retryAttempt) => {
    const stream = needle.get(streamURL, {
      headers: {
        "User-Agent": "v2FilterStreamJS",
        "Authorization": `Bearer ${token}`
      },
      timeout: 0
    });

    stream.on("data", async data => {
      try {
        if (tweetList.length < 10) {
          const json = JSON.parse(data);
          console.log(json);
          tweetList.push(json);
        }

        if (tweetList.length === 10) {
          res.status(200).json({
            result: "success",
            tweetList
          });
        }
      } catch (error) {
        if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
          console.log(data.detail);
          process.exit(1)
        } else {
        }
      }
    }).on("error", error => {
      if (error.code !== "ECONNRESET") {
        console.log(error.code);
        process.exit(1);
      } else {
        setTimeout(() => {
          console.warn("A connection error occurred. Reconnecting...")
          streamConnect(++retryAttempt);
        }, 2 ** retryAttempt)
      }
    });

    return stream;
  };

  (async () => {
    let currentRules;

    try {
      currentRules = await getAllRules();
      await deleteAllRules(currentRules);
      await setRules();

    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    streamConnect(0);
  })();
});

module.exports = router;
