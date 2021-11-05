const User = require('../models/userModel') ;
const sendToken = require('../utils/jwtToken');
const sendjwtToken = require('../utils/jwtToken') ;

const sendEmail = require('../utils/sendEmail') ;
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
         await new sendEmail(user , resetToken).sendPasswordReset() ;

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
        console.log(req.params.token) ;
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

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

exports.logoutUser = async (req , res , next) => {

    try{
        res.cookie('token' , null , {
            expires: new Date(Date.now()) ,
            httpOnly: true 
        })

        res.status(200).json({
            success: true ,
            message: 'Logged out'
        })
    } catch(error) {
        console.log(error) ;
    }
}

exports.deleteUser = async (req , res , next) => {
    try{
        const user = await User.findById(req.params.id) ;

        if(!user) {
            return next(new Error('user not found with the id you entered')) ;
        }

        await user.remove() ;

        res.status(200).json({
            success: true
        }) ;

    }catch(error) {
        console.log(error) ;
    }
}

exports.updateUser = async (req , res , next) => {
    try{

        const {email , username , role} = req.body ;

        const user = await User.findById(req.params.id) ;

        if(!user) {
            return next(new Error('user not found')) ;
        }

        user.email = email? email : user.email ;
        user.username = username? username : user.username ;
        user.role = role? role : user.role ;

        await user.save() ;

        res.status(200).json({
            message: 'successful' ,
            user
        })


    }catch(error) {
        console.log(error) ;
    }
}

exports.updateProfile = async (req , res , next) => {
    try{

        const {email , username } = req.body ;

        const user = await User.findById(req.params.id) ;

        if(!user) {
            return next(new Error('user not found')) ;
        }

        user.email = email? email : user.email ;
        user.username = username? username : user.username ;

        await user.save() ;

        res.status(200).json({
            message: 'successful' ,
            user
        })


    }catch(error) {
        console.log(error) ;
    }
}


exports.testEmail = async (req , res , next) => {
    try{

         console.log('trying to send email')
        await new sendEmail({
            email: "surafel097@outlook.com" ,
            name: "Surafel Gizachew"
        } , 'localhost:3000/api').sendPasswordReset() ;

        res.status(200).json({
            message: "successfully send message"
        })

    } catch(error) {
        res.json({
           error:  error.message
        })
        console.log(error) ;
    }
}