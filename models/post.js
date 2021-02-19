const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String ,
        required:true
    },
    user:{ //this user refers to our user in the DB and will take ref from the user schemaa
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //i need to fetch all comments of a post as soon as the post is loaded , hence we need to put these in an  arrray so the query is fast
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]

},{
    timestamps:true
});

const Post = mongoose.model("Post" , postSchema);
module.exports = Post;