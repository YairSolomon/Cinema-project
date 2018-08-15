const mongoose =require('mongoose');

const HallSchema= mongoose.Schema({
    hallNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    SeatsRows:Number,
    SeatsCols:Number
    
});

module.exports = mongoose.model("Hall", HallSchema);