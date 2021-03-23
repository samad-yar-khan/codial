const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toggleUser = async function(req , res){

    try {

        let toggledUser = await User.findById(req.query.userId).populate('friendships');
        let ourUser = await User.findById(req.query.userId).populate('friendships'); 

        //if there is a user who we wwish o be befrend 
        if(toggledUser){

            let friendship_op1 = await Friendship.findOne({
                from_user : req.user._id,
                to_user : req.query.userID 
            })

            let friendship_op2 = await Friendship.findOne({
                from_user : req.query.userID ,
                to_user :  req.user._id
            })

            if(friendship_op1){

                //we remove the friedship from both of their arrays of frinds
                await toggledUser.friendships.pull(friendship_op1._id);
                await toggleUser.save();
                await ourUser.friendships.pull(friendship_op1._id);
                await ourUser.save();
                await friendship_op1.remove();


            }else if(friendship_op2){

                await toggledUser.friendships.pull(friendship_op2._id);
                await toggleUser.save();
                await ourUser.friendships.pull(friendship_op2._id);
                await ourUser.save();
                await friendship_op2.remove();

            } else{

                let newFriendship = await Friendship.create({
                    from_user : req.user._id,
                    to_user :  req.query.userID
                });

                toggleUser.friendships.push(newFriendship);
                ourUser.friendships.push(newFriendship);

                toggleUser.save();
                ourUser.save();


            }

        }

        req.flash('success' , 'Friend Updated !');
        return res.redirect('back');;
        
    } catch (err) {
        
        console.log("ERROR : " , err);
        req.flash('error' , "Cant Add / Remove Friend !");
        return res.redirect('back');;
    }
    

}