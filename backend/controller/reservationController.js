const Reservation = require('../models/reservationModel') ;
const Room = require('../models/roomModel') ;

const catchAsync = require('../middleware/catchAsyncErrors') ;
const ErrorHandler = require('../utils/errorHandler') ;


exports.getSingleReservation = catchAsync(async(req ,res , next) => {
    const reservation = await Reservation.findById(req.params.id); 

    if(!reservation) {
        return next(ErrorHandler('no reservation found with the provided id')) ;
    }

    res.status(200).json({
        message: 'success' ,
        data: reservation
    })
})

exports.getAllReservations = catchAsync(async (req ,res , next) => {
    const reservations = await Reservation.find() ;

    res.status(200).json({
        message: 'success' ,
        data: reservation 
    })
})

exports.createReservation = catchAsync(async(req , res , next) => {

    const room = await Room.findById(req.body.room_id) ;
    console.log('1')
    if(room.status == 'pending') {
        return next(new ErrorHandler('some one is reserving this room please try again in 15 mins' , 400)) ;
    }
    if(room.status == 'taken') {
        return next(new ErrorHandler('This room is already taken' , 400)) ;
    }
    console.log('2')
    console.log(req.body.check_out_date) ;
    let no_days = new Date(req.body.check_out_date).getTime() - new Date(req.body.check_in_date).getTime() ;

    no_days = no_days / (1000 * 3600 * 24) ;

    console.log('no of days') ;
    console.log(no_days) ;


    req.body.price = room.price * no_days ;
    req.body.price_per_day = room.price ;
    console.log('Total price') ;
    console.log(req.body.price) ;
    const { check_in_date ,
            check_out_date ,
            room_id  
            }  = req.body ;
    req.body.host_id = room.host ;
    req.body.guest_id = req.user._id ;
    req.body.staing_days = no_days ;

    console.log('3') ;
    const reservation = await Reservation.create(req.body) ;
    console.log('reservation created') ;
    room.status = 'taken' ;

    const {status} = await room.save() ;


    res.status(200).json({
        message: 'success' ,
        data: reservation ,
        room_status: status
    })
}) ;

exports.updateReservation = catchAsync(async(req , res , next) => {
    
    
    const {
        status ,
        settlement ,
        check_in_date ,
        check_out_date 
    } = req.body ;

    const reservation = await Reservation.findById(req.params.id) ;

    console.log(req.params.id)
    console.log('This is reservation: ') ;
    console.log(reservation) ;


    if(req.body.check_in_date && req.body.check_out_date) {

        reservation.check_in_date = req.body.check_in_date ;
        reservation.check_out_date = req.body.check_out_date ;

        const no_days = await calculatePrice(req.body) ;

        reservation.price = reservation.price_per_day * no_days ;
        reservation.staing_days = no_days ;
    }
    else if(req.body.check_in_date) {
        reservation.check_in_date = req.body.check_in_date ;
        req.body.check_out_date = reservation.check_out_date
       const no_days = await calculatePrice(req.body) ;

        reservation.price = reservation.price_per_day * no_days ;
        reservation.staing_days = no_days ;

    }else if(req.body.check_out_date) {
        reservation.check_out_date = req.body.check_out_date ;
        req.body.check_in_date = reservation.check_in_date
       const no_days = await calculatePrice(req.body) ;

        reservation.price = reservation.price_per_day * no_days ;
        reservation.staing_days = no_days ;
    }

    const reserve  = await reservation.save() ;

    res.status(200).json({
        message: 'successful' ,
        reserve
    })


})

exports.deleteReservation = catchAsync(async(req ,res , next) => {
    const reservation = await Reservation.findById(req.params.id) ;

    if(!reservation) {
        return next(new ErrorHandler('no resrvation found' , 404)) ;

    }

    await resrvation.remove() ;
    
    res.status(201).json({
        message: 'success'
    })
})



const calculatePrice = async (body) => {

    const {price} = await Room.findById(body.room_id) ;
    let no_days = new Date(body.check_out_date).getTime() - new Date(body.check_in_date).getTime() ;

    no_days = no_days / (1000 * 3600 * 24) ;

    console.log('no of days') ;
    return no_days ;

}