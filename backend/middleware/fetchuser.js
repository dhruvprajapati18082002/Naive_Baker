var jwt = require("jsonwebtoken");

const JWT_SECRET = "SE@1234";


const fetchuser = (req, res, next)=>{
    // Get the user from JWT token and add id to req object
    const token = req.header('auth-token');

    if (!token){
        res.status(401).send({error: "Unauthorized - invalid authentication credentials given."});
    }

    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error: "Unauthorized - invalid authentication credentials given."});
    }
}

module.exports = fetchuser;