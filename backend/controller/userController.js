const User = require('../models/userModel') ;
const sendToken = require('../utils/jwtToken');
const sendjwtToken = require('../utils/jwtToken') ;

const crypto = require('crypto') ;

exports.createNewuser = async (req , res , next) => {
    try{
        req.body.phone = req.body.phone * 1 ;
        const response = await User.create(req.body) ;

        res.json({
            message: 'successfully saved user' ,
            data: response
        })
    }catch(error) {
        res.json({
            message: 'Error has occured' ,
            error
        })
    }

}

exports.getSingleUser = async (req , res , next) => {
    try{    
        console.log(req.params.id) ;
        const user = await User.findById(req.params.id) ;
        //console.log(user) ;
        res.status(200).json({
            data: user
        })

    }catch(error) {
        res.status(400).json({
            message: "error has occured" ,
            error: error.message
        })
    }
}

exports.getAllUsers = async (req , res , next) => {
    try{    
        console.log(req.params.id) ;
        const user = await User.find() ;
        //console.log(user) ;
        res.status(200).json({
            data: user
        })

    }catch(error) {
        res.status(400).json({
            message: "error has occured" ,
            error: error.message
        })
    }
}

exports.login = async (req , res , next) => {
    try{
        const {email , password} = req.body ;

        if(!email || !password) {
            console.log('please provide email and password') ;
        }

        const user = await User.findOne({email}).select('+password') ;

        if(!user) {
            console.log('you have not regestered yet') ;
            return next(new Error('you have not regestered yet')) ;
        }

        console.log(user) ;

        const isPasswordMatched = await user.comparePassword(password) ;


        if(!isPasswordMatched) {
            console.log('wrong password or email address')
            return next(new Error('wrong password or email')) ;
        }

        sendjwtToken(user , 200 , res) ;

      
    }catch(error) {
        console.log(error.message) ;
        res.status(400).json({
            message: 'Error' ,
            data: error
        })
    }
}

exports.forgotPassword = async(req , res , next) => {
    const user = await User.findOne({email: req.body.email}) ;
    try{
        

        if(!user) {
            return next(new Error('user is not found')) ;
        } 

        const resetToken = user.getResetPasswordToken() ;

        await user.save({ validateBeforeSave: false})

        if(!resetToken) {
            return next(new Error('could not generate forgot password token')) ;

        }

        res.status(200).json({
            message: 'reset token generated successfully' ,
            data: resetToken
        }) ;

    }catch(error) {
        user.resetPasswordToken = null ,
        user.resetPasswordExpire = null ,
        console.log(error) ;
    }
}

exports.resetPassword = async (req , res , next) => {
    try{
        console.log('This is reset password token') ;
        console.log(req.query.token) ;
        const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')

        const user = await User.findOne({
            resetPasswordToken , 
            resetPasswordExpire: {$gt: Date.now()}
        }) ;
    
        if(!user) {
            return next(new Error('password reset token invalid or expires')) ;

        }

        if(req.body.password !== req.body.confirmPassword) {
            return next(new Error('password does not match'))
        }

        user.password = req.body.password ;

        user.resetPasswordToken = undefined ;
        user.resetPasswordExpire = undefined ;

        await user.save() ;

        sendToken(user , 200 , res) ;
    }catch(error) {
        console.log(error)
    }
   
}