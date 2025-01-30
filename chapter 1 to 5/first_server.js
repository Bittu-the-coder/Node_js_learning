const fs = require("fs");

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Coding</title></head>");
    res.write("<body><h1>Welcome to our website</h1><p>Enter your details</p>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" name = "username" placeholder="Enter your name"/>'
    );
    res.write("<br>");

    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name = "gender" value="male"/>');
    res.write('<label for="female">Female</label>');
    res.write(
      '<input type="radio" id="female" name = "gender" value="female"/>'
    );
    res.write("<br>");
    res.write('<input type="submit" value="Submit">');
    res.write("</form>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLocaleLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      // const bodyObject = {};
      // for (const [key, val] of params.entries()) {
      //   bodyObject[key] = val;
      // }
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
    });
    fs.writeFileSync("user.txt", "Prashant Jain");
    res.statusCode = 302;
    res.setHeader("Location", "/");
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Coding</title></head>");
    res.write("<body><h1>This is me the coder.</h1></body>");
    res.write("</html>");
    return res.end();
  }

  process.exit();
};

module.exports = userRequestHandler;
