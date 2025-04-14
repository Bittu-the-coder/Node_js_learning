// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require("mongoose");



const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// const DB_PATH = process.env.MONGO_URI;
const DB_PATH = "mongodb+srv://bittup:Bittu138@cluster0.yfxesp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "gd",
  resave: false,
  saveUninitialized: true,
  store: store,
}));
app.use((req, res, next) => {
  // console.log("Middleware 1");
  // console.log(req.get("Cookie"));
  // req.isLoggedIn = req.get("Cookie") ? req.get("Cookie").split("=")[1] === "true" : false;
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use(storeRouter);
app.use(authRouter)
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login")
  }
  next()
});
app.use("/host", hostRouter);


app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3012;


mongoose.connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
