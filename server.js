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

app.post("/api/stories", function(req, res){
    const date = new Date();
    const displayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    req.body.dateCreated = displayDate;
    db.Story.create(req.body).then(function(data){
        res.send(data);
        console.log("created Entry");
    })
    .catch(function(err) {
        console.log(req.body)
        return res.json(err);
    })
  
   
    
})

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