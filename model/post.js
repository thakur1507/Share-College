const mongoose = require("mongoose");
 
const postschema = new mongoose.Schema({
    title:{
     type:String,
     required: true,
    },
    type:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required: true,
    },
    author:{
        type:String,
        required: true,
    },
    date :{
        type: Date,
        required:true,
    },
    upvote:{
        type: Array,
    },
    hashtags: Array,

});

module.exports = mongoose.model('post',postschema);