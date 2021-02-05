
module.exports.home = function(req ,res){

    // console.log(req.cookies);
    // res.cookie('user_id' , 100);
    return res.render('home' , {
        title:"home",
        heading:"THIS IS HOME"
    })

}

module.exports.homeLogin = function(req ,res){
    res.end('<h1>Login</h1>');
}