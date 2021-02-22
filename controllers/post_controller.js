
const User = require("../models/user");
const Post = require("../models/post");
const Comments = require('../models/comment');
const db = require("../config/index");

// PREVIOuS MEDTHOD

// module.exports.createPost = function(req , res){

//     const myUsersID = req.user._id;
//     const postContent = req.body.content;
    
//     Post.create({
//         content:postContent,
//         user:myUsersID
//     } , function(err){
//         if(err){
//             console.log("error creating new post in db ! ");
//             return res.redirect('/users/sign-in');
//         }
//         return res.redirect('/');
//     });
// }

// module.exports.destroy = function(req,res){
    
//     //first find the post exits or not depending on the url
//     Post.findById(req.params.id , function(err , post){
//         //this param will contai the id of the user who made the post
        
//         //this is should match with the id of the logged in user 
//         //user.id just covers our user._id into aa string automatically

//         if(err){
//             console.log("Error finding post to delete");
//             return;
//         }

//         //now we check if the person deleting the post must be authour of the post 
//         //we havent populated user yet , so it must be the user id
//         if(post.user == req.user.id){

//             //deleted the post 
//             post.remove();
//             //now go to the db and dlete aall the comments from that post 
//             //the id of the post is still there in the param
//             Comments.deleteMany({post:req.params.id} , function(err){ //this will delete the comments whose post field has the id of our post
//                 if(err){
//                 console.log(err)
//                     return;
//                 }
//                    });

//              return res.redirect('back');

//         }else{
//             return res.redirect('back');
//         }
//     });
// }

// ****Converting Code to ASYNC AWAIT***********

module.exports.createPost = async function(req , res){

    try {
        const myUsersID = req.user._id;
        const postContent = req.body.content;
    
        await Post.create({
            content:postContent,
            user:myUsersID
        } );

        return res.redirect('/');

    }catch (error){
        console.log("error creating new post in db ! ");
        return res.redirect('/users/sign-in');
    }

}

module.exports.destroy = async function(req,res){
    

    try {
                //first find the post exits or not depending on the url
        let post = await Post.findById(req.params.id );
        //this param will contai the id of the user who made the post
        
        //this is should match with the id of the logged in user 
        //user.id just covers our user._id into aa string automatically
        //now we check if the person deleting the post must be authour of the post 
        //we havent populated user yet , so it must be the user id
        if(post.user == req.user.id){

            //deleted the post 
            post.remove();
            //now go to the db and dlete aall the comments from that post 
            //the id of the post is still there in the param
            await Comments.deleteMany({post:req.params.id})

            return res.redirect('back');

        }else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log("error : ",err);
        return res.redirect('back');
    }

    }