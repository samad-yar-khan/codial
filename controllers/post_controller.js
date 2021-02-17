
const User = require("../models/user");
const Post = require("../models/post");
const db = require("../config/index");

module.exports.createPost = function(req , res){
    if(!(req.isAuthenticated())){
        return res.redirect('/users/sign-in');
    }

    const myUsersID = req.user._id;
    const postContent = req.body.content;
    Post.create({
        content:postContent,
        user:myUsersID
    } , function(err){
        if(err){
            console.log("error creating new post in db ! ");
            return res.redirect('/users/sign-in');
        }
        return res.redirect('/');
    });
}