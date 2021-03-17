const User = require('../models/user');
const Post = require('../models/post');
const Comments = require('../models/comment');
const Likes = require('../models/likes');


//now we will  get a query like 
// likes/toggleLike/?id=91819&type=comment

module.exports.toggleLike = async function(req,res){

    try {

        let likable = NULL; //will store the likable item later
        let deleted = false ; // will indicate if a liek has been delted or created

        let likableId = req.query.id ;
        let type = req.query.type; //type of likable

        if(type == 'Post'){
            likable = await Post.findById(likableId).populate('likes');
        }else{
            likable = await Comments.findById(likableId).populate('likes');
        }

        //now likable contains our parent element 
        //now we gotta find the like in our Likes
        let existingLike = Likes.findOne({
            user : req.user._id ,
            likable : req.query.id ,
            onModel : type
        });

        if(existingLike){

            likebale.likes.pull(existingLike._id);//pulled the like out of the array and deleted it
            likebale.save();

            existingLike.remove();
            deleted = true;

        }else{

            newLike = await Likes.create({
                user : req.user._id ,
                likable : req.query.id ,
                onModel : req.query.type
            });

            likable.likes.push(newLike._id);
            likebale.save();

        }   

        return res.json(200 , {
            message : "Request Sucessfull !" ,
            data  : {
                deleted : deleted
            }
        })

    } catch (err) {
        
    }


}

