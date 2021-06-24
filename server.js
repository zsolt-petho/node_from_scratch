const express = require("express");
const mongoose = require("mongoose");
const app = express();

await mongoose
  .connect("mongodb://localhost/accenture_node")
  .then((res) => {
    console.log("database started successfully");
  })
  .catch((err) => {
      console.log("database connection failed", err);
  });
  

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("3000 port is ready... ");
});
