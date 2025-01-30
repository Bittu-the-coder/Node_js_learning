//External module
const express = require("express");

//Local module
const user = require("./user");

const app = express();

app.use("/", (req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
  // res.send("<p>Welcome to my learning</p>");
  next();
});

app.post("/submit-details", (req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  //res.send("<p>Welcome to my learning</p>");
});

app.use("/", (req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
  res.send("<p>Welcome to middleware</p>");
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
