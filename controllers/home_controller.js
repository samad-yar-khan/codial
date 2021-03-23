
const db = require('../config/index');//mongoose
const User = require('../models/user');
const Post = require('../models/post');
const Comments = require('../models/comment');

//Previos Code which depended on call backs and would have lead to call back hell

// module.exports.home = function(req ,res){


//     Post.find({})
//     .populate('user')
//     .populate({ //prepolate comments aswelas the name user of each user bby nestiing
//         path : 'comments',
//         populate : {
//             path: 'user'
//         }
//     })
//     .exec(function(err,posts){

//         if(err){
//             console.log("error showing posts !");
//             return;
//         }

//         User.find({} , function(err , users){
             
//             if(err){
//                 return;
//             }


//             return res.render('home' , {
//                 title:"home",
//                 heading:"Welcome To Codial !",
//                 PostList:posts,
//                 all_users : users
//             });
//         });

      
//     });
 
//     // console.log(req.cookies);
//     // res.cookie('user_id' , 100);
// }


//Better way of writing code using async await method which is similiar to promises
//here we wait for an async req to process before going further

module.exports.home = async function(req ,res){

    try {
            //first asyc req to find and populate the post aswell as the  nested comments
           
            let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({ //prepolate comments aswelas the name user of each user bby nestiing
                path : 'comments',
                options :  { sort: { createdAt: -1 } },
                populate : {
                    path: 'user likes'
                },

               
            }).populate('likes')
            
            //now our server wiill wiat for the above req to process and proceed fuerther if there are no error 
            //if there are errors then they will be sent to catch

            let users = await  User.find({});
            let usersFriendships ;
            
            if(req.user){
             usersFriendships = await User.findById(req.user._id).populate({ //prepolate comments aswelas the name user of each user bby nestiing
                path : 'friendships',
                options :  { sort: { createdAt: -1 } },
                populate : {
                    path: 'from_user to_user'
                }})
            }
             //now our server wiill wiat for the above req to process and proceed fuerther if there are no error 
            //if there are errors then they will be sent to catch

            return res.render('home' , {
                title:"home",
                heading:"Welcome To Codial !",
                PostList:posts,
                all_users : users,
                myUser : usersFriendships
            });

    } catch (error) {
        console.log("ERROR : " , error);
        return;
    }
    
     // console.log(req.cookies);
    // res.cookie('user_id' , 100);
}


module.exports.homeLogin = function(req ,res){
    res.end('<h1>Login</h1>');
}