const mongoose = require('mongoose');
const User = require('./user');

const resetPassTokenSchema  = new mongoose.Schema({

    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    accessToken : {
        type : String,
        required : true
    } ,
    isValid : {
        type : Boolean ,
        required : true
    }

});

const ResetPassToken = mongoose.model('ResetPassToken' , resetPassTokenSchema);
module.exports = ResetPassToken;