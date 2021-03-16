const mongoose = require('mongoose');


//We are making the property likablle which stores the refernace to our onModel
//onModel is a preoprty itself and it is of type string and will be used to define ,
//the object on which this like exists 

const likeSchema = new mongoose.Schema({

    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // this defines the object id of the liked object
    likable : {
        type:mongoose.Schema.Types.ObjectId,
        required : true ,
        refPath: 'onModel' //Dynamic Referancing 
    },
    //this is the field used to define the type of the liked object since it is a dynamaic refernace 
    onModel :{
        type:String ,
        required:true,
        enum : ['Post' , 'Comment']
    }

});

const Like = mongoose.model('Like' , likable);
module.exports = Like;