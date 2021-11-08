const catchAsync = require('../middleware/catchAsyncErrors');
const Room = require('../models/roomModel') ;
const cloudinary = require('cloudinary') ;

exports.createRoom = catchAsync(async (req , res , next) => {
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


exports.getSingleRoom = catchAsync(async (req , res , next) => {
    
    console.log(req.params.id) ;
    const room = await Room.findById(req.params.id) ;
    //console.log(host) ;
    res.status(200).json({
        data: room
    })


})

exports.getAllHosts = catchAsync(async (req , res , next) => {

    console.log(req.params.id) ;
    const room = await Room.find() ;
    //console.log(host) ;
    res.status(200).json({
        data: room
    })


})
exports.deleteRoom = catchAsync(async (req , res , next) => {

    const room = await Room.findById(req.params.id) ;

    if(!room) {
        return next(new ErrorHandler('host not found with the id you entered' , 404)) ;
    }

    await room.remove() ;

    res.status(200).json({
        success: true
    }) ;


})
exports.updateRoom = catchAsync(async (req , res , next) => {

    const {username , email} = req.body ;

    const room = await Room.findById(req.params.id) ;

    if(!room) {
        return next(new ErrorHandler('host not found' , 404)) ;
    }

    Room.email = email? email : room.email ;
    Room.username = username? username : room.username ;

    if(req.files.photos) {
        const image_url = host.photos.public_id ;

        const res = await cloudinary.v2.uploader.destroy(image_url) ;

        const result = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath) ;

        host.photos[1].public_id = result.public_id ;
        host.photos[1].url = result.secure_url ;
    }

    await room.save() ;

    res.status(200).json({
        message: 'successful' ,
        data: room
    })



})
