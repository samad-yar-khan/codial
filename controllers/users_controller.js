//also called an action
//these are all actions
module.exports.profile = function(req ,res){
    
    return res.render('user_profile' , {
       title : "PROFILE",
       heading : "PROFILE PAGE" 
    });
};

module.exports.posts = function(req,res){
    res.end('<h1>POST FOR USER</h1>');
} ;