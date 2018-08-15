const mongoose =require('mongoose');

const ShowSchema= mongoose.Schema({
   hallNumber:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Hall"
   },
   movie:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Movie",
   },
   showDate:Date,
   showHour:String,   
   reservedSeats:{
       type:Array
   }
});

module.exports = mongoose.model("Show", ShowSchema);