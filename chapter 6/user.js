const { error } = require("console");
let fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html>");
    res.write("<body>");
    res.write("<form action='/submit' method='post'>");
    res.write("<label for='name'>Name:</label><br>");
    res.write("<input type='text' id='name' name='name'><br>");
    res.write("<label for='email'>Email:</label><br>");
    res.write("<input type='email' id='email' name='email'><br>");
    res.write("<input type='submit' value='Submit'>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.url === "/submit" && req.method === "POST") {
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
      // for (const [key, value] of params.entries()) {
      //   bodyObject[key] = value;
      // }
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFileSync(
        "user.txt",
        JSON.stringify(bodyObject, null, 2),
        (error) => {
          document.write("Data written successfully");
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      );
    });
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
