const jwt = require('jsonwebtoken') ;

const User = require('../models/userModel.js') ;

exports.AuthenticateUser = async (req , res , next) => {

    
    const tok = req.headers.cookie ;
    if(!tok) {
        return next(new Error('Login first to get access')) ;
    }
    const token = tok.split('=') ;
   

    const decoded = jwt.verify(token[1] , process.env.JWT_SECRET) ;

    req.user = await User.findById(decoded.id) ;
    next() ;
}

exports.authorizeRoles = (...roles) => {
    return (req , res , next) => {
        if(!roles.includes(req.user.role)) {
            return next(
                new Error(`Role (${req.user.role}) is not allowed to access this resource`) 
            )
        }
        next() ;
    }
 }

