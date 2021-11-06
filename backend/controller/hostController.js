const catchAsync = require('../middleware/catchAsyncErrors');
const Host = require('../models/hostModel') ;
const cloudinary = require('cloudinary') ;
const sendToken = require('../utils/jwtToken');

exports.createHost = catchAsync( async (req , res , next) => {

    let images = [] ;

    images.push(req.files.photos) ;

    let imagesLink = [] ;

    console.log(images[0].tempFilePath) ;
    for(let i = 0 ; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath , {
            folder: 'hosts'
        }) ;

        imagesLink.push({
            public_id: result.public_id ,
            url: result.secure_url
        })
    }

    req.body.photos = imagesLink ;
    req.body.createdBy = req.user.id ;

    const host = await Host.create(req.body) ;

    res.status(200).json({
        message: 'successly created a new host',
        host
    })
    //sendToken(host , 200 , res) ;

})