const path = require("path");
const fs = require("fs");
//app.use(express.static("public")); //////////////////

const notes = require("../db/db.json");

module.exports = function(app) {
    app.get("/api/notes", (req, res) => {
        res.json(notes);
      });


    app.post("/api/notes", (req, res) => {;
        let newNote = req.body;
        let id = notes.length;
        newNote.id = id + 1;
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), err => {
            if (err) { 
                throw(err) 
            };

        res.json(notes);
        console.log("note saved!");
    });
      
    app.delete("/api/notes/:id", (req, res) => {
        const itemRemove = req.params.id;
        const index = notes.findIndex((element) => element.id === parseInt(itemRemove));
        notes.splice(index, 1);
        res.json(notes);
    });
});
}