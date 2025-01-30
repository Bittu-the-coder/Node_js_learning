const path = require("path");
const express = require("express");

const rootDir = require("./utils/pathUtils");
const app = express();

const home = require("./routes/home");
const contact = require("./routes/contact-us");

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());
app.use(home);
app.use(contact);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
