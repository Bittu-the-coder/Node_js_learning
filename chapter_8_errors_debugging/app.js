const http = require("http");
const testingSyntax = require("./syntax");
const logic = require("./logical_error");
const calculateArea = require("./calculateArea");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  logic();
  res.end("Hello World\n");
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
