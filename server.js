const express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");

const db = require("./models");
const app = express();
const PORT = 3006;


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/nytreact", { useNewUrlParser: true });


app.get("/api/articles", function(req, res){
    const results = {
        title:"Hello World",
        link:"my Link",
        summary: "My summary"
    }
    db.Story.create(results).then(function(data){
        console.log("created Entry");
    })
    .catch(function(err) {
        return res.json(err);
    })
})

/**
 * Create a new Entry Via a POST request
 */
app.post("/api/stories", function(req, res) {
    const date = new Date();
    const displayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const dateCreatedFormated  = displayDate;
    req.body.dateCreated = displayDate;
    req.body.dateCreatedFormated = dateCreatedFormated;
    db.Story.create(req.body).then(function(data){
        res.send(data);
        console.log("created Entry");
    })
    .catch(function(err) {
        console.log(req.body)
        return res.json(err);
    })
})

app.put("/api/stories/:id", function(req, res) {
    db.Story.findByIdAndUpdate(
        { _id : req.params.id},
        { $push: {notes: req.body  }},
        function (error, success) {
            if (error) {
                res.send(error)
            }
            else { res.send(req.body)}
        });
})

/**
 * Get's all Stories back by get request
 */
app.get('/api/stories', function(req, res) {
    db.Story.find({}, function(error, found) {
        if (error) {
          console.log(error);
        }
        else {
          res.json(found);
        }
      });
})

/**
 * Delete a Story By id Via Delete
 */
app.delete('/api/stories/:id', function(req, res){
    console.log(req.params.id)
    db.Story.findByIdAndRemove(req.params.id, (err, todo) => {  
        if (err) return res.status(500).send(err);

        const response = {
            message: "Story successfully deleted",
        };
        return res.status(200).send(response);
    });
})

app.listen(PORT);