const mongoose = require('mongoose');

const Task = new mongoose.Schema(
    {
        title : {type : String, required : true},
        description : {type : String, required : true},
        status : {type : String, enum : ['to-do','doing','done'], required : true},
        email : {type : String, required : true}
    },
    { collection : "tasks"}
)

const model = mongoose.model("task", Task);

module.exports = model;