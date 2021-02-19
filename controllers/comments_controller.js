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

module.exports.destroy = function(req,res){
    
    //first find the post exits or not depending on the url
    Post.findById(req.params.id , function(err , post){
        //this param will contai the id of the user who made the post
        
        //this is should match with the id of the logged in user 
        //user.id just covers our user._id into aa string automatically

        if(err){
            console.log("Error finding post to delete");
            return;
        }

        //now we check if the person deleting the post must be authour of the post 
        //we havent populated user yet , so it must be the user id
        if(post.user == user.id){

            //deleted the post 
            post.Remove();
            //now go to the db and dlete aall the comments from that post 
            //the id of the post is still there in the param
            Comments.deleteMany({post:req.params.id} , function(err){ //this will delete the comments whose post field has the id of our post
                console.log(err)
                    return;
             });

             return res.redirect('back');

        }else{
            return res.redirect('back');
        }
    });
}
