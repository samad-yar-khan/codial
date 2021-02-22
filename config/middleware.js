
module.exports.setFlash = function(req, res , next){
    //here we find the flash from the request and set it up the locals of the response

    res.locals.flash = {
        "sucess" : req.flash('success'),
        "error" : req.flash('error')
    }
    next();

}
