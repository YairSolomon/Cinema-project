const mongoose =require('mongoose');

const MovieSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    director:String,
    description:String,
    releaseYear:Number,
    length:Number,
    imageUrl:String
});

module.exports = mongoose.model("Movie", MovieSchema);