const fs = require('fs');
const path = require('path');
const environment = require('./environment');


//we take the app as input because we need to store stuff in the local
//we will be fetcing our express and set our assetPath function in its locals so
//we are able to connect the hashed names of files with the real name 
module.exports = (app)=>{
//in file path we get soething like -(home.css) , this is something which we have named our file but after minising and usin rev , we hashed its name so , we need to link it to this hash-named and minimised version of the file which is done  using manifst
    app.locals.assetPath = function(filePath){

        if(environment.name == 'development'){
            return '/'+filePath; //in this case the file path which has been passed doent have a hashed file path
        }

        //if the path contains a hash we need to read the keyvalue pairs fron our manifest file in publics and return the actual path
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname , '../public/assets/rev-manifest.json')))[filePath]; //accces the key value pairs after getting the json to object


    }

}
