
const mongoose = require('mongoose');
const environment = require('./environment');

//connect mongoose to MONGODB
mongoose.connect(`mongodb://localhost/${environment.db}`  , { useNewUrlParser: true , useUnifiedTopology: true });

//check connection
const db = mongoose.connection;

db.on('error' , console.error.bind(console, "ERROR CONNECTING TO DATABSE"));

db.once('open' , function(){
    console.log("Connected to MongoDB");
});

module.exports = db;








