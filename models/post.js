const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:string ,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refer : 'User'
    }
},{
    timestamps:true
});

const Post = mongoose.model("Post" , postSchema);
module.exports = Post;