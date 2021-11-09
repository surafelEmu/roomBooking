const catchAsync = require('../middleware/catchAsyncErrors');
const Host = require('../models/hostModel') ;
const cloudinary = require('cloudinary') ;
const ErrorHandler = require('../utils/errorHandler');

exports.createHost = catchAsync( async (req , res , next) => {

//     let images = [] ;

//     images.push(req.files.photos) ;

//     let imagesLink = [] ;

//     console.log(images[0].tempFilePath) ;
//     for(let i = 0 ; i < images.length; i++) {
//         const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath , {
//             folder: 'hosts'
//         }) ;

//         imagesLink.push({
//             public_id: result.public_id ,
//             url: result.secure_url
//         })
//     }

//    req.body.photos = imagesLink ;

    const host = await Host.create(req.body) ;

    res.status(200).json({
        message: 'successly created a new host',
        host
    })

})


exports.getSinglehost = catchAsync(async (req , res , next) => {
    
        console.log(req.params.id) ;
        const host = await Host.findById(req.params.id) ;
        //console.log(host) ;
        res.status(200).json({
            data: host
        })

    
})

exports.getAllHosts = catchAsync(async (req , res , next) => {
   
        console.log(req.params.id) ;
        const host = await Host.find() ;
        //console.log(host) ;
        res.status(200).json({
            data: host
        })

    
})
exports.deletehost = catchAsync(async (req , res , next) => {
    
        const host = await Host.findById(req.params.id) ;

        if(!host) {
            return next(new ErrorHandler('host not found with the id you entered' , 404)) ;
        }

        await host.remove() ;

        res.status(200).json({
            success: true
        }) ;

 
})
exports.updateProfile = catchAsync(async (req , res , next) => {
   
        const {username , email} = req.body ;

        const host = await Host.findById(req.params.id) ;

        if(!host) {
            return next(new ErrorHandler('host not found' , 404)) ;
        }

        host.email = email? email : host.email ;
        host.username = username? username : host.username ;

        if(req.files.photos) {
            const image_url = host.photos.public_id ;

            const res = await cloudinary.v2.uploader.destroy(image_url) ;

            const result = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath) ;

            host.photos[1].public_id = result.public_id ;
            host.photos[1].url = result.secure_url ;
        }

        await host.save() ;

        res.status(200).json({
            message: 'successful' ,
            host
        })


  
})
