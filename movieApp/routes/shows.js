const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const Show = require('../models/show');
const Hall = require('../models/hall');
const bodyParser = require('body-parser');

const router = express.Router();

// get all shows per hall Number
router.get('/:hallNumber', (req, res) => {

    Hall.findOne({ hallNumber: req.params.hallNumber }, (err, selectedHall) => {

        if (err) {
            console.log('error in get hall form show page')
        }
        else {
            Show.find({ hallNumber: selectedHall._id }).populate('movie').exec((err, show) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.json(show)
                }
            })
        }
    });
});


//get shows by title

router.get('/order/:title', (req, res) => {

    Movie.findOne({title:req.params.title},(err,selectedMovie)=>{
        if(err){
            console.log(err)
        }
        else{
            let  movieId=selectedMovie._id;
            Show.find({movie:movieId}).populate('movie').populate('hallNumber').exec((err,show)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.json(show);
                }
            })
        }

    })

});

//show byid

router.get('/show/:showId',(req,res)=>{
  
    Show.findById(req.params.showId).populate('movie').populate('hallNumber').exec((err,show)=>{

        if(err){
            console.log(err)
        }
        else{
            res.json(show);
        }
    })
})

//add show

router.post('/:hallNumber', (req, res) => {

    let hallNumber = req.params.hallNumber;
    let hallId;



    Hall.findOne({ hallNumber: hallNumber }, (err, selectedHall) => {
        if (err) {
            console.log('erorr in find hall')
        }
        else {
            hallId = selectedHall._id;
            let movieTitle = req.body.movie;
            Movie.findOne({ title: movieTitle }, (err, selectedMovie) => {
                if (err) {
                    console.log('error in movie title')
                }
                else {
                    let movieId = selectedMovie._id;
                    let showData = { hallNumber: hallId, movie: movieId, showDate: req.body.showDate, showHour: req.body.showHour, reservedSeats: req.body.reservedSeats }
                    Show.create(showData, (err, showcreated) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log(showcreated)
                            res.json(showcreated);
                        }


                    });
                }
            })
        }
    })

})

//update show

router.put('/:showId', (req, res) => {

    let showId = req.params.showId;
    let movieId;
    Movie.findOne({ title: req.body.movie }, (err, updatedMovie) => {
        if (err) {
            console.log(err)
        }
        else {
            movieId = updatedMovie._id;
            updatedShow = { movie: movieId, showDate: req.body.showDate, showHour: req.body.showHour }
            Show.findByIdAndUpdate(showId, updatedShow, (err, newShow) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(newShow)
                    res.json(newShow);


                }
            })

        }
    })


});

//delete show

router.delete('/:showId', (req, res) => {

    Show.findByIdAndRemove(req.params.showId, (err, deletedShow) => {
        if (err) {
            console.log('error in delete show')
        }
        else {
            console.log(deletedShow);
            res.json(deletedShow);
        }
    })


});




module.exports = router;
