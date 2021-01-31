
module.exports.home = function(req ,res){

    return res.render('home' , {
        title:"home",
        heading:"THIS IS HOME"
    })

}

module.exports.homeLogin = function(req ,res){
    res.end('<h1>Login</h1>');
}