const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); 
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    
    const authorization = req.headers.authorization; 
    //authorization === "Bearer slSLkMmcqopMAmosnodnoAno"
    
    //If user dose not provide any Authorization header
    if(!authorization){
        return res.status(401).send({error: "You must be logged in."});
    }

    //Extracting the Token
    const token = authorization.replace('Bearer ','') 
    
    //Verifying the token by using jwt.verify 
    jwt.verify(token, 'THE_SECRET_KEY', async (err, payload)=>{
        if(err) {
            return res.status(401).send ({error: "You must be logged in."})
        }
        // extracting User ID from payload
        const {userId} = payload; 

        //finding the user from Mongo DB
        const user = await User.findById(userId); 

        //assign the user to user property of the request
        req.user = user; 

        //going to next step in chain of middlewares 
        next(); 
    })
}; 