//Core Module
const path = require("path");

//External module
const express = require("express");

//Local module
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");

const app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3242;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
