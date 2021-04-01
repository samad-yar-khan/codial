
const development = {
    
    name : 'development' ,
    asset_path : './assets',
    session_cookie_key : 'blahblah',
    db : 'codial_development', //here we add the db name
    smtp :{

        service : 'gmail' ,
        host : 'smtp.gmail.com'  ,
        port : 587 , //need for tls
        secure : 'false' ,
        auth : {
            user : "samad.ic19@nsut.ac.in" ,
            pass : "pass"
            }
        
        },
    //vars for google oath
    google_client_id : "582821821390-gm5gfjmvb0etffmnhp31tk4db3m7dcj0.apps.googleusercontent.com",
    google_client_secret: "Va9YwBqXwevhpH3fuST1ZJyo",
    google_callback_url : "http://localhost:8000/users/auth/google/callback",//same as set in google while regesterings
    jwt_secret : "codial",
}


const production = {

    name : 'production'

}  

//we choose what needs to be exported 
module.exports = development;