const express= require('express');
const mongoose = require('mongoose');
const User= require('../models/user');
// const bodyParser=require('body-parser');

const router= express.Router();

//show all movies
router.get('/',(req,res)=>{

    User.find({}).then(users =>{
            res.json(users);
        },err =>{
            console.log(err);
        })
    });

//add new movie



module.exports=router;
