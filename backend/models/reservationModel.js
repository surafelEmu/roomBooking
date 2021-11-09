const mongoose = require('mongoose') ;

const Room = require('./roomModel.js') ;
const reservationSchema = mongoose.Schema({
    check_in_date: {
        type: Date ,
        required: [true , 'provide your check in date']
    } ,
    check_out_date: {
        type: Date ,
        required: [true , 'provide your check out date']
    } ,
    price: {
        type: Number ,
        default: 0 
    } ,
    status: {
        type: String ,
        enum: {
            values: [
                'completed', 
                'pending' 
            ]
        } ,
        default: 'pending'
    } ,
    room_id: {
        type: mongoose.Schema.ObjectId ,
        ref: 'room' ,
        required: [true , 'provide a room id you want to reserve']
    } ,
    guest_id: {
        type: mongoose.Schema.ObjectId ,
        ref: 'user' ,
        requried: [true , 'provide a user id']
    } ,
    host_id: {
        type: mongoose.Schema.ObjectId ,
        ref: 'host' ,
        requried: [true , 'provide a host id']
    } ,
    settlement: {
        type: Number ,
        default: 0
    } ,
    staing_days: {
        type:Number 
    } ,
    price_per_day: {
        type: Number
    }
}) ;


module.exports = mongoose.model('reservation' , reservationSchema) ;