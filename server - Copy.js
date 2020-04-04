const express = require("express");
//const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); //////////////////


// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
let notes = require("./db/db.json");
let n = 0;

///////////// html routes ///////////////////
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


//////////// api routes //////////////////
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  n += 1;
  let note = req.body;
  note.id = n;
  notes.push(note);
  res.json(note);
  console.log("note saved!!");
});

//////////// delete notes ////////////////
app.delete("/api/notes/:id", (req, res) => {
  notes.splice(req.params.id, 1);
  res.json(notes);
})





//////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server is listening port: ${PORT}`);
  });