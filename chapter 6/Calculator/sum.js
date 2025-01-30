const sumReqestHandler = (req, res) => {
  console.log("In sum request handler", req.url);
  console.log("1st task");

  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
    console.log("2nd task");
  });

  req.on("end", () => {
    console.log("3rd task");

    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);

    const firstNumber = Number(bodyObj.first);
    const secondNumber = Number(bodyObj.second);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/html");
      res.write(`
        <html lang="en">
          <head>
            <title>Calculator</title>
          </head>
          <body>
            <h1>Invalid input. Please enter valid numbers.</h1>
          </body>
        </html>
      `);
      return res.end();
    }

    const result = firstNumber + secondNumber;
    console.log(result);

    console.log("4th task");
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html lang="en">
        <head>
          <title>Calculator</title>
        </head>
        <body>
          <h1>Your result is ${result}</h1>
        </body>
      </html>
    `);
    return res.end();
  });
};

module.exports = sumReqestHandler;
