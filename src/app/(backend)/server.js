const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const PORT = process.env.PORT || 8080;
const client = new MongoClient(process.env.CONNECTION_STRING);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

app.get("/", async (req, res) => {
  res.send("Hello");
});
