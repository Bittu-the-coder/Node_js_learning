const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2", req.url, req.method);
  next();
});

app.get("/", (req, res, next) => {
  console.log("Middleware 3", req.url, req.method);
  res.send("<h1>Hello World</h>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("handle form", req.url, req.method);
  res.send(
    '<form action="/contact-us" method="post">' +
      '<label for="name">Name:</label><br>' +
      '<input type="text" id="name" name="name"><br>' +
      '<label for="email">Email:</label><br>' +
      '<input type="email" id="email" name="email"><br>' +
      '<label for="message">Message:</label><br>' +
      '<textarea id="message" name="message"></textarea><br>' +
      '<input type="submit" value="Submit">' +
      "</form>"
  );
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log("handle", req.url, req.method, req.body);
  res.send("<h1>Thanks for your information</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
