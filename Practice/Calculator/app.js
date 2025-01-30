const http = require("http");
const calSum = require("./cal");

const server = http.createServer(calSum);

const PORT = 3007;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
