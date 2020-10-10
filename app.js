const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const config = require("./config");
const boolParser = require('express-query-boolean');
const db = mongoose.connection;

//Global middleware
app.use(cors());
app.use(boolParser());
app.use(express.json({ limit: "6mb", extended: true }));
app.use(express.urlencoded({ limit: "6mb", extended: true }));

// connect to db
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.once("open", () => {
  console.log("connected to db successfully!");
}).on("error", (err) => {
  console.log("error: ",err);
});

app.get("/", (req, res) => {
  res.send("OK!");
});

app.use("/api", routes);

module.exports = app;
