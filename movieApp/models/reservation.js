const mongoose =require('mongoose');

const reservationSchema= mongoose.Schema({
    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Show"
    },
    ticketsNum:Number,
    seats:{
        type:Array
    },
    orderDate:Date
});

module.exports = mongoose.model("Reservation", reservationSchema);