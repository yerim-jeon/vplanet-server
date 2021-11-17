const express = require("express");
const router = express.Router();

const tweet = require("./tweet");

router.use("/tweet", tweet);

module.exports = router;
