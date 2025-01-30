const sumBtn = require("./sum");
const calculate = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Calculator</title>
  </head>
  <body>
    <h2>Welcome to Calculator</h2>
    <a href="/calculator">Calculator</a>
  </body>
</html>`);
    return res.end(); // Ending the response properly
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      
<html lang="en">
  <head>
    <title>Calculator</title>
  </head>
  <body>
    <h1>Here is the calculator</h1>
    <form action="/calculate-result" method="POST">
      <input type="text" placeholder="First Number" name="first" />
      <input type="text" placeholder="Second Number" name="second" />
      <button>Add</button>
    </form>
  </body>
</html>

      `);
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumBtn(req, res);
  } else {
    // Handle other routes, e.g., return a 404 message for non-root paths
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 404;
    res.write("<h1>404 - Page Not Found</h1>");
    return res.end(); // End response for non-root paths
  }
};

module.exports = calculate;
