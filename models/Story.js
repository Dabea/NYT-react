const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StorySchema = new Schema ({

title :{
    type: String,
    required: true
},
link:{
    type: String,
    required: true,
    unique : true
},
summary: {
    type: String,
    required: true
},
dateCreated: {
    type:Date,
},
dateCreatedFormated: {
    type: String,
},
notes: {
    type: Array
}

});

const Story = mongoose.model("Story", StorySchema);

module.exports = Story;