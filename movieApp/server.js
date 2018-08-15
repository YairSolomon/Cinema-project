const express= require('express');
const path = require ('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport = require('passport');
const passportLocal=require('passport-local');


const app=express();

//allow CORS
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

//models

const User= require('./models/user');
const Movie= require('./models/movie');
const hall=require('./models/hall');
const Show=require('./models/show');
const Reservation=require('./models/reservation')

//routes
const MoviesRoutes=require('./routes/movies');
const UserRoutes=require('./routes/user');
const hallRoutes=require('./routes/halls');
const ShowsRoutes=require('./routes/shows');
const OrdersRoutes=require('./routes/orders');


// config body-parser and api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/user',UserRoutes);
app.use('/movies',MoviesRoutes);
app.use('/halls',hallRoutes)
app.use('/shows',ShowsRoutes);
app.use('/orders',OrdersRoutes)



// passport configuration 

// app.use(require("express-session")({
//     secret:"secret word",
//     resave: false,
//     saveUninitialized:false
// }));

// app.use(passport.initialize());

// app.use(passport.session());

// passport.use(new passportLocal(User.authenticate())); // --> comes from user model passportLocal mongoose
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// end of passport configuration 


//database connection 

const url="mongodb://localhost:27017/moviedb";

mongoose.connect(url);


let db=mongoose.connection;

db.once('open',()=>{
    console.log("data base connected");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})


app.listen(3000,()=>{
    console.log("server connected");
});
