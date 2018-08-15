const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const bodyParser = require('body-parser');
const Show = require('../models/show');
const Reservation = require('../models/reservation')

const router = express.Router();

//see all orders
router.get('/', (req, res) => {

    Reservation.find({}, (err, orders) => {
        if (err) {
            console.log(err)
          
        }
        else {
            // console.log(orders);
            res.json(orders);
        }
    })

})

//find all reserved seats per show
router.get('/:showId', (req, res) => {

    const showId = req.params.showId;

    Show.findById(showId, (err, show) => {
        if (err) {
            console.log(err)
        }
        else {
           
            res.json(show.reservedSeats)
        }
    })

});

// create an order 
router.post('/:showId', (req, res, next) => {

    Reservation.create({show: req.body.show, orderDate: req.body.orderDate, ticketsNum: req.body.ticketsNum }, function (err, newOrder) {

        if (err) {

            console.log(err)
        }
        else {
            newOrder.save();
         
            Reservation.findByIdAndUpdate(newOrder._id, { "$push": { "seats": req.body.seats } }).exec((updatedOrder) => {
                if (err) {
                    console.log(er)
                }
                else {
                    Show.findByIdAndUpdate(req.body.show, { "$push": { "reservedSeats": req.body.seats } }).exec((updatedShow) => {

                        if (err) {
                            console.log(err)
                            return next(err)
                        }

                    })
                    res.json(newOrder)
                }
            })
        }
    });
});


// update reserved seats in the show by admin
router.put('/', (req, res) => {

    const showId = req.body.showId
    const seatId = req.body.seat.id

    Show.findByIdAndUpdate(showId, { "$pull": { "reservedSeats": { id: seatId } } }, (err, updatedShow) => {

        updatedShow.save();

        res.json(updatedShow);
    })
})


//delte order
router.delete('/:orderId',(req,res)=>{

    // update the resererved seats
    let orderId=req.params.orderId;
    Reservation.findOneAndRemove({_id:orderId}).populate('show').exec((err,order)=>{
        if(err){
            console.log(err)
        }
        else{
            let seatsId=[];

            for(let i=0;i<order.seats.length;i++){
                seatsId.push(order.seats[i].id);
            }
            console.log(seatsId);

            let showId=order.show._id
          
    
                Show.findByIdAndUpdate(showId,{"$pull":{"reservedSeats":{"id":{$in:seatsId}}}},(err,show)=>{
            
                res.json(order)

            })

        }
    })
       
});
module.exports = router;
