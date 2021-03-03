
const Post = require('../../../models/post');
const Comments = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate({
        path :'user',
        select :{'name' : 1 , 'email' : 1}
    })
    .populate({ //prepolate comments aswelas the name user of each user bby nestiing
        path : 'comments',
        options :  { sort: { createdAt: -1 } },
        populate : {
            path: 'user',
            select :{'name' : 1 , 'email' : 1}
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
                
        let post = await Post.findById(req.params.id);
        
        let postDeleted = post;
            //deleted the post 
        post.remove();
            //now go to the db and dlete aall the comments from that post 
            //the id of the post is still there in the param
        post.update();
            
        await Comments.deleteMany({post:req.params.id});

          return res.json(200 , {
              data :{
                deletedPost : postDeleted
              },
              message:"Post and associated comments delted !"
          })

    
    }catch (err) {
    
        return res.json(500 , {
            message:"Internal Server Error!"
        })
    }

    }
