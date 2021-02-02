const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

//we need to  use this before the routes are called so that
//the controllers know that we need a layout with the veiws
app.use(express.static('./assets'));

app.use(expressLayouts);

//we need to sepaerate the controllers from the index.js 
//for that we setup and express router such that all requests go in that router and after that they
//are matched with a conrroller
app.use('/' , require('./routes'));//by default it will giive us an index.js file

//setup the veiws engine as ejs
//set has a bunch of properties which can be mapped using the function express and setup
//major properties 
app.set('view engine' , 'ejs');
app.set('views' , './views');


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

