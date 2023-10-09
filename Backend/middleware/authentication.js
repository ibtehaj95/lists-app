const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors");

const auth = (req, res, next) => {
    //check header
    const authHdr = req.headers.authorization;
    if(!authHdr || !authHdr.startsWith("Bearer")){
        throw new UnauthenticatedError("Token Not Found");
    }
    const token = authHdr.split(" ")[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userID: payload.userID,
            name: payload.name,
        }
        next();
    }
    catch (err){
        // console.log(err);
        throw new UnauthenticatedError("Invalid Token");
    }
};

module.exports = auth;