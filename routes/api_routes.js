const app = require("express").Router();
const fs = require("fs");
let api = require("../db/db.json");

app.get("/api/notes", function (req, res) {
  api = JSON.parse(fs.readFileSync("/db/db.json")) || [];
  res.json(api);
});

app.post("/api/notes", function (req, res) {
  api.push([
    {
      id: Math.floor(Math.random() * 100),
      title: req.body.title,
      text: req.body.text,
    },
  ]);
  fs.rwriteFileSync("/db/db.json", JSON.stringify(api), function (err) {
    if (err) throw err;
  });
  res.json(api);
});
