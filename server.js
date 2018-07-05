const express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");

const db = require("./models");
const app = express();
const PORT = 3000;


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/nytreact");


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

app.post("/api/articles", function(req, res){
   res.send(req.body)
    
    db.Story.create(req.body).then(function(data){
        res.send(data);
        console.log("created Entry");
    })
    .catch(function(err) {
        console.log(req.body)
        return res.json(err);
    })
})

app.listen(PORT);