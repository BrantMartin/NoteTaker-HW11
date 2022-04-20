const app = require("express").Router();
const fs = require("fs");
let api = require("../db/db.json");

app.get("/api/notes", function (req, res) {
  api = JSON.parse(fs.readFileSync("./db/db.json")) || [];
  res.json(api);
});

app.post("/api/notes", function (req, res) {
  api.push(
    {
      id: Math.floor(Math.random() * 100),
      title: req.body.title,
      text: req.body.text,
    },
  );
  fs.writeFileSync("./db/db.json", JSON.stringify(api), function (err) {
    if (err) throw err;
  });
  res.json(api);
});

app.delete("/api/notes/:id", function (req, res) { 
    let notDeletedNotes = []
    for (let i = 0; i < api.length; i++) {
        if (api[i].id != req.params.id){
            notDeletedNotes.push(api[i])
        }
    }
    api = notDeletedNotes
    fs.writeFileSync("./db/db.json", JSON.stringify(api), function (err) {
      if (err) throw err;
    });
    res.json(api);
  });

module.exports = app