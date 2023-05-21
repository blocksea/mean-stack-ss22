var $gXNCa$express = require("express");
var $gXNCa$expresshttpproxy = require("express-http-proxy");
var $gXNCa$cors = require("cors");
var $gXNCa$mongodb = require("mongodb");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiread9b"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiread9b"] = parcelRequire;
}
parcelRequire.register("6PUCX", function(module, exports) {




var $4fa36e821943b400$require$MongoClient = $gXNCa$mongodb.MongoClient;

var $4fa36e821943b400$require$ObjectId = $gXNCa$mongodb.ObjectId;
// Create Express app
const app = $gXNCa$express();
// Add CORS to all routes and methods
app.use($gXNCa$cors());
// Enable parsing of JSON bodies
app.use($gXNCa$express.json());
// Initialize parameters
const port = eval("process.env.PORT") || 3600;
const dbName = "mean_database";
const collectionName = "people";
// ----------------------------------------------------
// TASK 1.1 START
const dbUrl = "mongodb+srv://nxgenuser:nxgenDatabase@cluster0.5ldhe.mongodb.net/coursemapper?retryWrites=true&w=majority";
// TASK 1.1 END
// ----------------------------------------------------
// Create database object
let db;
// Define server routes
// List all people
app.route("/people").get(async (req, res)=>{
    let people = [];
    // ----------------------------------------------------
    // TASK 2.1 START
    people = await db.collection(collectionName).find({}).toArray();
    // TASK 2.1 END
    // ----------------------------------------------------
    res.json(people);
});
// Get a person
app.route("/people/:id").get(async (req, res)=>{
    const id = req.params.id;
    const result = await db.collection(collectionName).findOne($4fa36e821943b400$require$ObjectId(id));
    if (!result) {
        res.status(404).json({});
        return;
    }
    res.json(result);
});
// Create a new person
app.route("/people").post(async (req, res)=>{
    const doc = req.body;
    const result = await db.collection(collectionName).insertOne(doc);
    res.status(201).json({
        _id: result.insertedId
    });
});
// Update a person
app.route("/people/:id").put(async (req, res)=>{
    const id = req.params.id;
    const doc = req.body;
    const result = await db.collection(collectionName).updateOne({
        _id: $4fa36e821943b400$require$ObjectId(id)
    }, {
        $set: doc
    });
    if (result.matchedCount == 0) {
        res.status(404).json({});
        return;
    }
    res.json({});
});
// Delete a person
app.route("/people/:id").delete(async (req, res)=>{
    const id = req.params.id;
    // ----------------------------------------------------
    // TASK 3.1 START
    await db.collection(collectionName).deleteOne({
        _id: $4fa36e821943b400$require$ObjectId(id)
    });
    // TASK 3.1 END
    // ----------------------------------------------------
    res.json({});
});
// Reverse proxy or static file server for frontend
const env = "production";
if (env == "production") app.use("/", $gXNCa$express.static("public"));
else app.use("/", $gXNCa$expresshttpproxy("localhost:4200"));
// Start server and listen for requests
app.listen(port, function() {
    console.log("Listening on " + port + ".");
});
// Connect to database
$4fa36e821943b400$require$MongoClient.connect(dbUrl, (err, client)=>{
    if (err) {
        console.error(err);
        return;
    }
    db = client.db(dbName);
    console.log("Connected to database");
});

});


parcelRequire("6PUCX");

//# sourceMappingURL=main.js.map
