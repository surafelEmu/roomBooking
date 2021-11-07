const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Room = require('../models/roomModel') ;
const cloudinary = require('cloudinary') ;

exports.createRoom = catchAsyncErrors(async (req , res , next) => {
    let images = [] ;

    images.push(req.files.photos) ;
    
    let imagesLink = [] ;
    for(let i = 0 ; i < images.length ; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath , {
            folder: 'room' ,
        }) ;

        imagesLink.push({
            public_id: result.public_id ,
            url: result.secure_url
        })
    }

    req.body.photos = imagesLink ;

    const room = await Room.create(req.body) ;

    res.status(200).json({
        message: "successfully created room" ,
        room
    })
}) ;

exports.updateRoom = catchAsyncErrors(async(req , res , next) => {
    
})