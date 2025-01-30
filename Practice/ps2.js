const fs = require("fs");
console.log("1. Start of script");
// synchronous operation
console.log("2. Reading file synchronously");
const dataSync = fs.readFileSync("user-details.txt", "utf8");
console.log("3. Data read synchronously");

// Asynchronous operation
console.log("4. Start of asynchronous operation");
fs.readFile("user-details.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("5. Data read asynchronously");
});
console.log("6. End of script");
