
const db = require('../config/index');//mongoose
const User = require('../models/user');
const Post = require('../models/post');
const Comments = require('../models/comment');



module.exports.home = function(req ,res){


    Post.find({})
    .populate('user')
    .populate({ //prepolate comments aswelas the name user of each user bby nestiing
        path : 'comments',
        populate : {
            path: 'user'
        }
    })
    .exec(function(err,posts){

        if(err){
            console.log("error showing posts !");
            return;
        }

        User.find({} , function(err , users){
             
            if(err){
                return;
            }


            return res.render('home' , {
                title:"home",
                heading:"Welcome To Codial !",
                PostList:posts,
                all_users : users
            });
        });

      
    });
 
    // console.log(req.cookies);
    // res.cookie('user_id' , 100);
}

module.exports.homeLogin = function(req ,res){
    res.end('<h1>Login</h1>');
}