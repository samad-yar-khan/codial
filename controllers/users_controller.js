//also called an action
//these are all actions
module.exports.profile = function(req ,res){
    res.end('<h1>EXPRESS UP FOR MY Profile</h1>');
};

module.exports.posts = function(req,res){
    res.end('<h1>POST FOR USER</h1>');
} ;