"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var cors = require("cors");
var express = require("express");
var database_1 = require("../database");
var dow_routes_1 = require("../dow.routes");
dotenv.config();
var ATLAS_URI = process.env.ATLAS_URI;
if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}
var PORT = process.env.PORT || 5200;
(0, database_1.connectToDatabase)(ATLAS_URI)
  .then(function () {
    var app = express();
    app.use(cors());
    app.use("/dow", dow_routes_1.dowRouter);
    app.listen(process.env.PORT || 5200, function () {
      console.log("Server is on " + PORT);
    });
  })
  ["catch"](function (error) {
    return console.error(error);
  });
