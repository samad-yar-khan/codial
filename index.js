const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const db = require('./config/index');
const User = require('./models/user');
const cookieParser = require("cookie-parser");


//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const { pass } = require("./config/index");


//connect-mongo to store cooied even after server restarts
const MongoStore = require('connect-mongo')(session);//we need to pass the session as argument when we require the mongoconnect as we want to store the session cookies in data base


//we need to  use this before the routes are called so that
//the controllers know that we need a layout with the veiws
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract the styles and scripts from pages to the ayout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

app.use(express.urlencoded());
//ask express to use coockie parser
app.use(cookieParser());

//setup the veiws engine as ejs
//set has a bunch of properties which can be mapped using the function express and setup
//major properties 
app.set('view engine' , 'ejs');
app.set('views' , './views');

//setting up the pasport session
//mongosttore is useed to store session cookies in the db
app.use(session({
    name:'codial' ,
    //TO DO change the secret before deploymnet in productioon mode
    secret : 'blahblah' ,
    saveUninitialized : false ,
    resave : false ,
    cookie : {
        maxAge : (1000*60*100) //this is the milli seconds
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    //make a calllback func to handle error
    function(err){
        if(err){
            console.log('ERROR in connecting mongoose store to db : ', err );
        }else{
            console.log('mongoStore connected to db');
        }
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

//this middlwre will be called each time and if aa user is authenticated , it will send the user data to the locals , so it can be used  by views
app.use(passport.setAuthenticatedUser);

//we need to sepaerate the controllers from the index.js 
//for that we setup and express router such that all requests go in that router and after that they
//are matched with a conrroller
app.use('/' , require('./routes'));//by default it will giive us an index.js file


app.listen(port , function(err){

    if(err){
        // console.log("Error in running server : " , err);
        //nowe have used backticks and inclluded our variable inside the string using
        //something call interpolation
        console.log(`Error in running server : ${err}`); 
        return;
    }

    console.log(`SERVER UP AND RUNNING ON PORT ${port}`);


})

