const http = require("http");

const Server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === "/home") {
    res.write("<h1>Welcome to Home</h1>");
  } else if (req.url === "/men") {
    res.write("<h1>Welcome to Men</h1>");
  } else if (req.url === "/women") {
    res.write("<h1>Welcome to Women</h1>");
  } else if (req.url === "/kids") {
    res.write("<h1>Welcome to Kids</h1>");
  } else if (req.url === "/cart") {
    res.write("<h1>Welcome to Cart</h1>");
  } else {
  }

  if (req.url === "/") {
    res.write("<html><head><title>Myntra</title><z/head>");
    res.write(
      `<body><nav><ul><li><a href= "/home">Home</a><li><li><a href= "/men">Men</a><li><li><a href= "/women">Women</a><li><li><a href= "/kids">Kids</a><li><li><a href= "/cart">Cart</a><li></nav><body>`
    );
  }
});

const PORT = 3001;

Server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
