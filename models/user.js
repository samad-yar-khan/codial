
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    email:{
        type: String,
        required : true,
        unique :true
    },
    password:{
        type: String,
        required : true,
    },
    name :{
        type: String ,
        required : true
    }
},{
    timestamps:true //this is to  keep track of time at which  user is created and updated
});


//now we need to convert this schema to model

const User = mongoose.model("User" , userSchema);

module.exports = User;
