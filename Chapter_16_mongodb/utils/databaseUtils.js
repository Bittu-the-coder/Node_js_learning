require("dotenv").config();
const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL = process.env.MONGO_URI;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting to database:", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("No database found");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
