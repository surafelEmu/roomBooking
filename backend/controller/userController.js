const User = require('../models/userModel') ;
const sendToken = require('../utils/jwtToken');
const sendjwtToken = require('../utils/jwtToken') ;
const sendEmail = require('../utils/sendEmail') ;
const catchAsync = require('../middleware/catchAsyncErrors') ;
const ErrorHandler = require('../utils/errorHandler');
const crypto = require('crypto') ;
const cloudinary = require('cloudinary') ;

exports.createNewuser = catchAsync(async (req , res , next) => {
   
        console.log(req.files.avatar.tempFilePath)
        const result = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath , {
            public_id: `${Date.now()}` ,
            resource_type: "auto" ,
            folder: 'avatars' ,
            width: 150 ,
            crop: "scale"
        })
        console.log(result.public_id)

        const { name, email, password , phone} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        phone,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
       sendToken(user , 200 , res) ;
    
    

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
            return next(new ErrorHandler('you have not regestered yet' , 400)) ;
        }

        console.log(user) ;

        const isPasswordMatched = await user.comparePassword(password) ;


        if(!isPasswordMatched) {
            console.log('wrong password or email address')
            return next(new ErrorHandler('wrong password or email' , 400)) ;
        }

        sendjwtToken(user , 200 , res) ;

      
    
})

exports.forgotPassword = catchAsync(async(req , res , next) => {
    const user = await User.findOne({email: req.body.email}) ;
   

        if(!user) {
            return next(new ErrorHandler('user is not found' , 400)) ;
        } 

        const resetToken = user.getResetPasswordToken() ;

        await user.save({ validateBeforeSave: false})

        if(!resetToken) {
            return next(new ErrorHandler('could not generate forgot password token' , 400)) ;
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
            return next(new ErrorHandler('password reset token invalid or expires' , 400)) ;

        }

        if(req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler('password does not match' , 400))
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
            return next(new ErrorHandler('user not found with the id you entered' , 400)) ;
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
            return next(new ErrorHandler('user not found' , 400)) ;
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
            return next(new ErrorHandler('user not found' , 404)) ;
        }

        user.email = email? email : user.email ;
        user.username = username? username : user.username ;

        if(req.files.avatar) {
            const image_url = user.avatar.public_id ;

            const res = await cloudinary.v2.uploader.destroy(image_url) ;

            const result = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath) ;

            user.avatar.public_id = result.public_id ;
            user.avatar.url = result.secure_url ;
        }

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

exports.changePassword = catchAsync(async(req ,res ,next) => {

    const user = await User.findById(req.user._id).select("+password") ;

    
    const isMatch = await user.comparePassword(req.body.oldPassword) ;
    console.log(req.body.oldPassword)
    if(!isMatch) {
       return  next(new ErrorHandler('old password does not match with the entered one' , 400)) ;
    }

    user.password = req.body.password ;

    await user.save() ;

   sendToken(user , 200 , res) ;
})