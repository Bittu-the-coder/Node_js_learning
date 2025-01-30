const fs = require("fs");
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Registration Form</h1>");
    res.write("<form action='/register' method='post'>");
    res.write("<label for='username'>Username:</label><br>");
    res.write("<input type='text' id='username' name='username'><br>");
    res.write("<label for='email'>Email:</label><br>");
    res.write("<input type='email' id='email' name='email'><br>");
    res.write("<label for='password'>Password:</label><br>");
    res.write("<input type='password' id='password' name='password'><br>");
    res.write("<label for='confirmPassword'>Confirm Password:</label><br>");
    res.write(
      "<input type='password' id='confirmPassword' name='confirmPassword'><br>"
    );
    res.write("<input type='submit' value='Register'>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.url === "/register" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsedBody = querystring.parse(body);
        const { username, email, password, confirmPassword } = parsedBody;
        if (password === confirmPassword) {
          res.writeHead(201, { "Content-Type": "text/plain" });
          res.write("User created successfully");
          res.end();
        } else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.write("Passwords do not match");
          res.end();
        }
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
        res.end();
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Page not found");
    res.end();
  }
});

const PORT = 4322;

server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
