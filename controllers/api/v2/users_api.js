const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req , res){

    try {
        let user = await User.findOne({email:req.body.email});
        console.log(req.body.password);
        if(!user || user.password != req.body.password){
        
            return res.json(422, {
                message:"Invalid Username Or Password"           
            });

        }

        return res.json(200,{
            message :"Sign in sucessfull , here is your token . Keep it safe !",
            data :{
                token : jwt.sign(user.toJSON() , "codial" ,  {expiresIn : '1000000'})//toJSON converts the user to json and codial is the secret encryption key usin which we decrypt and encrypt the jwt
            }
        })


    } catch (error) {
        return res.json(500 , {
            message:"Internal Server Error!"
        })
    }


}

