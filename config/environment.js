
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

    name : process.env.CODIAL_ENVIRONMENT,
    asset_path : process.env.CODIAL_ASSET_PATH,
    session_cookie_key : process.env.CODIAL_SESSION_COOKIE_KEY, //using random key gen .com
    db : process.env.CODIAL_DB, //here we add the db name
    smtp :{

        service : 'gmail' ,
        host : 'smtp.gmail.com'  ,
        port : 587 , //need for tls
        secure : 'false' ,
        auth : {
            user : process.env.CODIAL_GMAIL_USERNAME ,
            pass : process.env.CODIAL_GMAIL_PASSWORD
            }
        
        },
    //vars for google oath
    google_client_id : process.env.CODIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url : process.env.CODIAL_GOOGLE_CALLBACK_URL,//same as set in google while regesterings
    jwt_secret : process.env.CODIAL_JWT_SECRET,//using random key gen .com

}  

//we choose what needs to be exported 
module.exports = eval(process.env.CODIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODIAL_ENVIRONMENT);