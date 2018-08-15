const express= require('express');
const mongoose = require('mongoose');
const Movie= require('../models/movie');
const Show= require('../models/show');
const Hall=require('../models/hall');
const bodyParser=require('body-parser');

const router= express.Router();

//show all halls
router.get('/',(req,res)=>{
    let hall_number=req.params.number;
   
    Hall.find({},function(err,halls){
        if(err){
            console.log(err);
        }
        else{
            res.json(halls)
       
        }
    }
)});

    // var res = await Movie.find({});

//add new Hall

router.post('/',(req,res)=>{
    const newHall=req.body;
    console.log('in post')
    console.log(newHall);

    Hall.create(newHall,function(err,newHallCreated){
        if(err){
            console.log(err);
        }
        else{
            //get data from from;
            console.log(newHallCreated)
                res.json(newHallCreated);

        }
    })
});

router.put('/:hallNumber',(req,res)=>{
    
    const hallNumber=req.params.hallNumber;

    Hall.findOneAndUpdate({hallNumber:hallNumber},req.body,(err,updateHall)=>{

        if(err){
            console.log(err)
        }
        else{
            console.log(updateHall)
            res.json(updateHall);
        }
    });
})

router.delete('/:hallNumber',(req,res)=>{

    const hall=req.params.hallNumber;

    Hall.findOneAndRemove({hallNumber:hall},(err,deleteHall)=>{

        if(err){
            console.log(err)
        }
        else{
            res.json(deleteHall);
        }
    });
});


router.get( '/:hallNumber/data',(req,res)=>{

    Hall.findOne({hallNumber:req.params.hallNumber},(err,selctedHall)=>{
        if(err){
            console.log(err)
        }
        else{
            let seats=selctedHall.SeatsRows * selctedHall.SeatsCols;
            
            res.json(seats);
        }

        

    })

});



router.get( '/:hallNumber/info',(req,res)=>{

    Hall.findOne({hallNumber:req.params.hallNumber},(err,selctedHall)=>{
        if(err){
            console.log(err)
        }
        else{
            let seats={rows:selctedHall.SeatsRows ,cols: selctedHall.SeatsCols};
            
            res.json(seats);
        }

        

    })

});



module.exports=router;
