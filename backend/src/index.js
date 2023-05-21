const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

// Create Express app
const app = express();

// Add CORS to all routes and methods
app.use(cors());

// Enable parsing of JSON bodies
app.use(express.json());

// Initialize parameters
const port = eval("process.env.PORT") || 3600;
const dbName = "mean_database";
const collectionName = "people";

// ----------------------------------------------------
// TASK 1.1 START
const dbUrl =
  "mongodb+srv://nxgenuser:nxgenDatabase@cluster0.5ldhe.mongodb.net/coursemapper?retryWrites=true&w=majority";
// TASK 1.1 END
// ----------------------------------------------------

// Create database object
let db;

// Define server routes
// List all people
app.route("/people").get(async (req, res) => {
  let people = [];

  // ----------------------------------------------------
  // TASK 2.1 START
  people = await db.collection(collectionName).find({}).toArray();

  // TASK 2.1 END
  // ----------------------------------------------------

  res.json(people);
});

// Get a person
app.route("/people/:id").get(async (req, res) => {
  const id = req.params.id;
  const result = await db.collection(collectionName).findOne(ObjectId(id));

  if (!result) {
    res.status(404).json({});
    return;
  }

  res.json(result);
});

// Create a new person
app.route("/people").post(async (req, res) => {
  const doc = req.body;
  const result = await db.collection(collectionName).insertOne(doc);
  res.status(201).json({ _id: result.insertedId });
});

// Update a person
app.route("/people/:id").put(async (req, res) => {
  const id = req.params.id;
  const doc = req.body;
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: ObjectId(id) }, { $set: doc });

  if (result.matchedCount == 0) {
    res.status(404).json({});
    return;
  }

  res.json({});
});

// Delete a person
app.route("/people/:id").delete(async (req, res) => {
  const id = req.params.id;

  // ----------------------------------------------------
  // TASK 3.1 START
  await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
  // TASK 3.1 END
  // ----------------------------------------------------

  res.json({});
});

// Reverse proxy or static file server for frontend
const env = process.env.NODE_ENV || "development";
if (env == "production") {
  app.use("/", express.static("public"));
} else {
  app.use("/", proxy("localhost:4200"));
}

// Start server and listen for requests
app.listen(port, function () {
  console.log("Listening on " + port + ".");
});

// Connect to database
MongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  db = client.db(dbName);

  console.log("Connected to database");
});
