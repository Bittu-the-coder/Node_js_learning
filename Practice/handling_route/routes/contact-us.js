//core module
const path = require("path");

const express = require("express");
const contact = express.Router();

const rootDir = require("../utils/pathUtils");

contact.get("/contact-us", (req, res, next) => {
  console.log("handle form", req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
});

contact.post("/contact-us", (req, res, next) => {
  console.log("handle", req.url, req.method, req.body);
  res.sendFile(path.join(rootDir, "views", "success.html"));
});

module.exports = contact;
