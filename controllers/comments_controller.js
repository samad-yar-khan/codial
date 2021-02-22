const Comments = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

// module.exports.create = function( req , res ){

//     //before adding a comment check if the post on which we are trying to add the coments evven exitss or not 

//     Post.findById(req.body.post , function(err , post){

//         if(err){
//             console.log("Error finding post ! ");
//             return;
//         }

//         //if we found a post
//         if(post){

//             Comments.create({
//                 content : req.body.content,
//                 //yaha hamne seede user and post dala because wo type id hai to khud usse id extract karlega
//                 user : req.user, //this was sttored ij the locals by passport
//                 post : post
//             } , function(err , comment){
//                 if(err){
//                     console.log("Error creating comment !");
//                     return;
//                 }

//                 //now we need to add this comments id to post
//                 post.comments.push(comment); //this by default  will just push our comments id to the comment array of our post
//                 post.save(); //savve must be called after each updation 

//             })
//         }

//         return res.redirect('/');
//     });


// }



// module.exports.destroy = function(req,res){
    
//     //now we are getting our comment id in the pparam 
//     let commentId = req.query.commentId;
//     Comments.findById(commentId , function(err,comment) {

//         if(err){
//             console.log("Error finding comment to be deleted : ",err);
//             return;
//         }

//         if(comment){

//             //check of the guy deleting the comment is the one who posted the comment
//             if(comment.user == req.user.id || req.query.postAuthor  == req.user.id ){

//                 postId = comment.post;
//                 comment.remove();

//                 //now we must delete the id of the this comment from the array of comments in our post
//                 Post.findByIdAndUpdate(postId ,{ $pull: {comments : commentId}} , function(err, comment){
//                     if(err){
//                         console.log("comment not found in post : " , err);
//                         return;
//                     }

//                     return res.redirect('back');
//                 });

//             }else{
//                 return res.redirect('back');
//             }
//         }
//     });
// }

//*************ASYNC AWAIT****************

module.exports.create = async function( req , res ){

    try {
        let post = await Post.findById(req.body.post) ;

        //if we found a post
       if(post){

            let comment = await Comments.create({
                content : req.body.content,
                //yaha hamne seede user and post dala because wo type id hai to khud usse id extract karlega
                user : req.user, //this was sttored ij the locals by passport
                post : post
            } );

                //now we need to add this comments id to post
            post.comments.push(comment); //this by default  will just push our comments id to the comment array of our post
            post.save(); //savve must be called after each updation 

        }
    
        return res.redirect('/');
    } catch (err) {
        console.log("Error : ",err);
        return ;
    }
    //before adding a comment check if the post on which we are trying to add the coments evven exitss or not 

}



module.exports.destroy = async function(req,res){
    
    try {
        
        //find the comment to be delted
        let commentId = req.query.commentId;
        let comment = await Comments.findById(commentId);
        
        //if coments is found 
        if(comment){

            //check of the guy deleting the comment is the one who posted the comment
            if(comment.user == req.user.id || req.query.postAuthor  == req.user.id ){

                postId = comment.post;
                comment.remove();

                //delete the comments if from the pposts comment array
                await Post.findByIdAndUpdate(postId ,{ $pull: {comments : commentId}});            
            }
        }
        return res.redirect('back');

    } catch (err) {
        console.log("ERROR : ",err);
        return;
    }

}