
const mongoose = require('mongoose');

//connect mongoose to MONGODB
mongoose.connect('mongodb://localhost/codial_development'  , { useNewUrlParser: true , useUnifiedTopology: true });

//check connection
const db = mongoose.connection;

db.on('error' , console.error.bind(console, "ERROR CONNECTING TO DATABSE"));

db.once('open' , function(){
    console.log("Connected to MongoDB");
});

module.exports = db;








