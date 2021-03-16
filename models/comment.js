const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    content :{
        type:String,
        required:true
    },
    //comment belongs to a user
    user : {
        type:mongoose.Schema.Types.ObjectId, //this will save the object ID
        ref :'User' //user kka schema ko ref
    },
    //the comment will refer to a post
    post :{
        type:mongoose.Schema.Types.ObjectId,
        ref :"Post"
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]

},{
    timestamps:true
});

const Comment = mongoose.model('Comment' , commentSchema);

module.exports = Comment;
