const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/model");

const app = express();
app.use(express.urlencoded({ extended: true }));

//link for database connection
const db =
    "mongodb+srv://newton:apple123@notes.9pl20.mongodb.net/notesDatabase?retryWrites=true&w=majority";

//connecting to the database
mongoose
    .connect(db)
    .then((res) => {
        app.listen(3000); //after connnecting to the database listen to this port...
    })
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

//for home page
app.get("/", function (req, res) {
    Note.find()
        .then((result) => {
            res.render("index", { result });
        })
        .catch((err) => {
            console.log(err);
        });
});
//for posting a new note...
app.post("/", (req, res) => {
    const note = new Note(req.body);
    note.save()
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});

//for new note
app.get("/note", function (req, res) {
    res.render("note");
});

//get individual notes
app.get("/:id", (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then((result) => {
            res.render("indi", { result });
        })
        .catch((err) => {
            console.log(err);
        });
});

//delete notes
app.delete("/:id", (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/" });
        })
        .catch((err) => {
            console.log(err);
        });
});

//for page not found
app.use((req, res) => {
    res.render("error");
});
