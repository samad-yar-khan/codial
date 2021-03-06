const express = require("express");
const environment = require("./config/environment");
const logger = require('morgan');//used to create log for our console statments in dev enviroenment
const app = express();
require('./config/view-helper')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const db = require('./config/index');
const User = require('./models/user');
const cookieParser = require("cookie-parser");
const sassMiddelware = require('node-sass-middleware'); //this middeware helps node convert sass files to css before sening back to ths server
const flash = require ('connect-flash');//for flash messages
const customMiddleware = require('./config/middleware');//has flash middle ware to transffer data from req to locals of res 
 

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportJWT = require('./config/passport_jwt_strategy');
const passportGoogle = require('./config/passport_google_oauth2_strategy');


//connect-mongo to store cookies even after server restarts
const MongoStore = require('connect-mongo')(session);//we need to pass the session as argument when we require the mongoconnect as we want to store the session cookies in data base


//setup chat sever to be used with socket.io
const chatServer = require('http').Server(app);
const chatSocktes = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat sever listening on port ",5000);

//we only want the sass files to be used in development environment and not in actual production mode
if(environment.name == 'development'){
    //before the veiws are rendered we need to setup the sass middlware so files are convverted to css
    app.use(sassMiddelware({

        src : path.join(__dirname , environment.asset_path , 'scss') ,//dir location of our sass files
        dest :  path.join(__dirname , environment.asset_path , 'css') , //this decides where to put the rendered css files 
        debug : true , //this debug mode is true for development mode so that wecan debig and get the errors , but in the deploymnet mode this will be false
        outputStyle:'extended' , //means we want all our code in different lines
        prefix : '/css' //this tells what prefix to look for in our asstes folder when we look for css files
    }));
}
//we need to  use this before the routes are called so that
//the controllers know that we need a layout with the veiws
app.use(express.static(environment.asset_path));
// this makes the upoads path available to the broweser becaiuse warna hame uska controller banana padhtay
app.use('/uploads' , express.static(__dirname + '/uploads'));

app.use(logger(environment.morgan.mode , environment.morgan.options));

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
    secret : environment.session_cookie_key ,
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

//flash saves our flash messgaes in the cookkies /locals temporarily , just to show the message and deleted ot on reload
app.use(flash()); //must be setup right after the session and before 
app.use(customMiddleware.setFlash);

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

