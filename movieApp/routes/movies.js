const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const bodyParser = require('body-parser');

const router = express.Router();

//show all movies
router.get('/', (req, res) => {
    // console.log('in movies');
    Movie.find({}).then(movies => {
       
        res.json(movies);
    }, err => {
        console.log(err);
    })
});


//add new movie

router.post('/', (req, res) => {

    const newMovie = req.body;

    Movie.create(newMovie, function (err, newMovieCreated) {
        if (err) {
            console.log(err);
        }
        else {
            if (err) return next(err);
            res.json(newMovieCreated);

        }
    })
});

// get movie by title

router.get('/:title', (req, res) => {

    Movie.findOne({ title: req.params.title }, function (err, selectedMovie) {

        if (err) {
            console.log(err);
        }
        else {

            res.json(selectedMovie);
        }
    }
    )
});

// update movie

router.put('/:title/edit', (req, res) => {


    Movie.findOneAndUpdate({ title: req.params.title }, req.body, (err, updatedMovie) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(updatedMovie)
            res.json(updatedMovie);
        }
    }
    )
});

router.delete('/:title', (req, res) => {


    Movie.findOneAndRemove({ title: req.params.title }, (err, deleteMovie) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(deleteMovie)
            res.json(deleteMovie);
        }
    }
    )
});


module.exports = router;
