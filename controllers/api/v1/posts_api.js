
const Post = require('../../../models/post');
const Comments = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user' )
    .populate({ //prepolate comments aswelas the name user of each user bby nestiing
        path : 'comments',
        options :  { sort: { createdAt: -1 } },
        populate : {
            path: 'user'
        }
    })

    return res.json(200, {
        data : {
            posts : posts
        },
        message : "Sucess"
    })
}


module.exports.destroy = async function(req,res){
    
    
    try {

        
                //first find the post exits or not depending on the url
        let post = await Post.findById(req.params.id);
        //this param will contai the id of the user who made the post
        
        //this is should match with the id of the logged in user 
        //user.id just covers our user._id into aa string automatically
        //now we check if the person deleting the post must be authour of the post 
        //we havent populated user yet , so it must be the user id
        
        if(post.user == req.user.id ){

            //deleted the post 
            post.remove();
            //now go to the db and dlete aall the comments from that post 
            //the id of the post is still there in the param
          
            
            await Comments.deleteMany({post:req.params.id})

        

          return res.json(200 , {
              message:"Post and associated comments delted !"
          })
        }else{
            return res.json(401 , {
                message :"You cannot delete this post"
            })
        }
    
    }catch (err) {
    
        return res.json(500 , {
            message:"Internal Server Error!"
        })
    }

    }