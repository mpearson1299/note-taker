const express = require("express");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// html routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html" ))
})

// api routes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const notes = JSON.parse(data);

        res.json(notes)
    })
})

app.post("/api/notes", (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            res.json(newNote)
        })
    })

})



app.listen(3001, () => {
    console.log("Server is now running!")
})
