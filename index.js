const express = require("express");
const app = express();
const port = 8000;

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

