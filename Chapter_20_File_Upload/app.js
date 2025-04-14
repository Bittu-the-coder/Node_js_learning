// // Core Modules
// const path = require("path");

// // External Modules
// const express = require("express");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const multer = require("multer");
// const mongoose = require("mongoose");

// // Local Modules
// const storeRouter = require("./routes/storeRouter");
// const hostRouter = require("./routes/hostRouter");
// const authRouter = require("./routes/authRouter");
// const rootDir = require("./utils/pathUtil");
// const errorsController = require("./controllers/errors");

// // Constants
// const PORT = 3012;
// const DB_PATH = "mongodb+srv://bittup:Bittu138@cluster0.yfxesp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Initialize Express App
// const app = express();

// // Configuration
// app.set("view engine", "ejs");
// app.set("views", "views");

// // Database Connection
// mongoose.connect(DB_PATH)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("Error connecting to MongoDB", err));

// // Session Configuration
// const sessionStore = new MongoDBStore({
//   uri: DB_PATH,
//   collection: "sessions",
// });

// app.use(session({
//   secret: "gd",
//   resave: false,
//   saveUninitialized: true,
//   store: sessionStore,
// }));

// // Utility Functions
// const randomString = (length) => {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// };

// // File Upload Configuration
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       const dest = file.fieldname === 'homeRules' ? 'uploads/rules/' : 'uploads/';
//       cb(null, dest);
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${randomString(10)}-${file.originalname}`);
//     }
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === 'photo') {
//       if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.mimetype)) {
//         return cb(null, true);
//       }
//     } else if (file.fieldname === 'homeRules') {
//       if (file.mimetype === 'application/pdf') {
//         return cb(null, true);
//       }
//     }
//     cb(null, false);
//   }
// });

// const uploadMiddleware = upload.fields([
//   { name: 'photo', maxCount: 10 },
//   { name: 'homeRules', maxCount: 1 }
// ]);

// // Middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(uploadMiddleware);

// app.use((req, res, next) => {
//   req.isLoggedIn = req.session.isLoggedIn || false;
//   next();
// });

// // Static Files
// app.use(express.static(path.join(rootDir, "public")));
// app.use("/uploads", express.static(path.join(rootDir, "uploads")));

// // Routes
// app.use("/", storeRouter);
// app.use("/auth", authRouter);

// // Protected Routes
// app.use("/host", (req, res, next) => {
//   if (!req.isLoggedIn) {
//     return res.redirect("/login");
//   }
//   next();
// });
// app.use("/host", hostRouter);

// // File Download Route
// app.get('/download-rules/:homeId', (req, res) => {
//   const homeId = req.params.homeId;
//   const rulesFileName = `HouseRules_${homeId}.pdf`;
//   const rulesFilePath = path.join(rootDir, "uploads", "rules", rulesFileName);

//   res.download(rulesFilePath, (err) => {
//     if (err) {
//       console.error("Error downloading file:", err);
//       res.status(500).send("Error downloading file.");
//     }
//   });
// });

// // Error Handling
// app.use(errorsController.pageNotFound);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });











// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

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

const randomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/gif") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOptions = {
  storage: storage,
  fileFilter: fileFilter,
}

app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single("photo"));

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
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

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
