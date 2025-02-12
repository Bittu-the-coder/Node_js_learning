const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://bittup:Bittu138@cluster0.tifju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log("error while connecting to database", err);
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
