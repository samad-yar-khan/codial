const Comments = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

module.exports.create = function( req , res ){

    //before adding a comment check if the post on which we are trying to add the coments evven exitss or not 

    Post.findById(req.body.post , function(err , post){

        if(err){
            console.log("Error finding post ! ");
            return;
        }

        //if we found a post
        if(post){

            Comments.create({
                content : req.body.content,
                //yaha hamne seede user and post dala because wo type id hai to khud usse id extract karlega
                user : req.user, //this was sttored ij the locals by passport
                post : post
            } , function(err , comment){
                if(err){
                    console.log("Error creating comment !");
                    return;
                }

                //now we need to add this comments id to post
                post.comments.push(comment); //this by default  will just push our comments id to the comment array of our post
                post.save(); //savve must be called after each updation 

            })
        }

        return res.redirect('/');
    });


}


