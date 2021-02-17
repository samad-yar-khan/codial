
const db = require('../config/index');//mongoose
const User = require('../models/user');
const Post = require('../models/post');



module.exports.home = function(req ,res){


    Post.find({}).populate('user').exec(function(err,posts){

        if(err){
            console.log("error showing posts !");
            return;
        }

        return res.render('home' , {
            title:"home",
            heading:"Welcome To Codial !",
            PostList:posts
        })
    });
 
    // console.log(req.cookies);
    // res.cookie('user_id' , 100);
}

module.exports.homeLogin = function(req ,res){
    res.end('<h1>Login</h1>');
}