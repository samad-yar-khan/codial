
const mongoose = require('mongoose');
const multer = require('multer');
const { dirname } = require('path');
const path = require("path");
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar:{
        type :String 
    },
    friendships :[{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Friendship'
    }]
},{
    timestamps:true //this is to  keep track of time at which  user is created and updated
});

//config multer
//here we define the storage to be used
let storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb is the callback fucntion
      cb(null, path.join(__dirname , ".." , AVATAR_PATH )) //we need to pass of our uploaded files to this callback function , so here we are getting the current direcotry , going a step abbove and into the uploads foler
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()) //Date.now() give sthe times since 1970 1st jan , to now in mili sec so we have uniye files names
    }
  })

//***** Static methods ****//
//static functions - staticc functions are those whihc can be used by all objects of that class and not a specefic object . they are class speciefic not object spcefic
//this will set the storrage property of multe rto the storage which we have defined above so it can righfully put the destination and filename easily
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar'); // single specifies that only one file ccan be uploaded for the feild
userSchema.statics.avatarPath = AVATAR_PATH; //so we can us ethe avatar path outside of this in our controller

//now we need to convert this schema to model

const User = mongoose.model("User" , userSchema);

module.exports = User;
