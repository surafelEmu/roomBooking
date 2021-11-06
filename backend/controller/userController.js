const User = require('../models/userModel') ;
const sendToken = require('../utils/jwtToken');
const sendjwtToken = require('../utils/jwtToken') ;
const sendEmail = require('../utils/sendEmail') ;
const catchAsync = require('../middleware/catchAsyncErrors') ;
const crypto = require('crypto') ;

exports.createNewuser = catchAsync(async (req , res , next) => {
   
        req.body.phone = req.body.phone * 1 ;
        const response = await User.create(req.body) ;

        res.json({
            message: 'successfully saved user' ,
            data: response
        })
    
    

})

exports.getSingleUser = catchAsync(async (req , res , next) => {
    
        console.log(req.params.id) ;
        const user = await User.findById(req.params.id) ;
        //console.log(user) ;
        res.status(200).json({
            data: user
        })

    
})

exports.getAllUsers = catchAsync(async (req , res , next) => {
   
        console.log(req.params.id) ;
        const user = await User.find() ;
        //console.log(user) ;
        res.status(200).json({
            data: user
        })

    
})

exports.login = catchAsync( async (req , res , next) => {
   
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

      
    
})

exports.forgotPassword = catchAsync(async(req , res , next) => {
    const user = await User.findOne({email: req.body.email}) ;
   

        if(!user) {
            return next(new Error('user is not found')) ;
        } 

        const resetToken = user.getResetPasswordToken() ;

        await user.save({ validateBeforeSave: false})

        if(!resetToken) {
            return next(new Error('could not generate forgot password token')) ;
 }
 try{
        
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
})

exports.resetPassword = catchAsync(async (req , res , next) => {
   
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
  
})

exports.logoutUser = catchAsync(async (req , res , next) => {

   
        res.cookie('token' , null , {
            expires: new Date(Date.now()) ,
            httpOnly: true 
        })

        res.status(200).json({
            success: true ,
            message: 'Logged out'
        })
 
})

exports.deleteUser = catchAsync(async (req , res , next) => {
    
        const user = await User.findById(req.params.id) ;

        if(!user) {
            return next(new Error('user not found with the id you entered')) ;
        }

        await user.remove() ;

        res.status(200).json({
            success: true
        }) ;

 
})

exports.updateUser = catchAsync(async (req , res , next) => {

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


})

exports.updateProfile = catchAsync(async (req , res , next) => {
   
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


  
})


exports.testEmail =  catchAsync(async (req , res , next) => {
   
         console.log('trying to send email')
        await new sendEmail({
            email: "surafel097@outlook.com" ,
            name: "Surafel Gizachew"
        } , 'localhost:3000/api').sendPasswordReset() ;

        res.status(200).json({
            message: "successfully send message"
        })

    
})