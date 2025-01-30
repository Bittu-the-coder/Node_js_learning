//core module
const path = require("path");

//external module
const express = require("express");
const home = express.Router();

const rootDir = require("../utils/pathUtils");

home.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = home;
