const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, UnauthenticatedError} = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new BadRequestError("Required Field(s) Empty");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const tempUser = {name, email, password: hashedPwd};

    const user = await User.create({
        ...tempUser,
    });

    const token = jwt.sign({
            userID: user._id,
            name: user.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
    
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
        },
        token,
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError("Please provide Email and Password");
    }
    
    //find email
    const user = await User.findOne({
        email,
    });

    if(!user){
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = jwt.sign({
            userID: user._id,
            name: user.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );

    //check password

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw new UnauthenticatedError("Invalid Credentials");
    }
    
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
        },
        token,
    });
};

module.exports = {
    register,
    login,
}