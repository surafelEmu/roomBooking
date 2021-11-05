const User = require('../models/userModel') ;

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
        }

        if(!user.comparePassword(user.password , password)) {
            console.log('wrong password or email address')
        }

        res.status(200).json({
            message: 'successfully logged in ' ,
            data: user
        })
    }catch(error) {
        console.log(error) ;
        res.status(400).json({
            message: 'Error' ,
            data: error
        })
    }
}