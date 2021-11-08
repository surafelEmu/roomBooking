const mongoose = require('mongoose') ;
const validator = require('validator') ;

const roomSchema = mongoose.Schema({
    name: {
        type: String ,
        required: true ,
        maxLength: [30 , 'the name must not be more than 30 char']
    } ,
    numofRooms: {
        type: Number ,
        required: true 
    } ,
    type: {
        type: String,
        required: true 
    } ,
    description: {
        type: String ,
        required: true 
    } ,
    avaliable: {
        type: Boolean ,
        default: true 
    } ,
    state: {
        type: String ,
        enum: {
            values: [
                'active' ,
                'pending' ,
                'taken'
            ]
        } ,
        default: 'active'
    } ,
    bed_count: {
        type: Number ,
        default: 1
    } ,
    bath_count: {
        type: Number ,
        default: 1
    } ,
    avaliable_date: {
        type: Date
    } ,
    price: {
        type: String ,

    } ,
    photos: [
        {
            public_id: {
                type: String ,
                required: true 
            } ,
            url: {
                type: String ,
                required: true 
            } 
        }
    ] ,
    reviews: [
        {
            comment: {
                type: String ,
                required: true 
            } ,
            rating: {
                type: Number ,
                required: true 
            } ,
            user: {
                type: mongoose.Schema.ObjectId ,
                ref: 'user' ,
                required: true
            }
        }
    ] ,
    host: {
        type: mongoose.Schema.ObjectId ,
        ref: 'host' ,
        required: true 
    } ,
    rating: {
        type: Number , 
        default: 0
    } ,
    numOfReviews: {
        type: Number ,
        default: 0
    } ,
    createdAt: {
        type: Date ,
        default: Date.now
    }
}) ;

module.exports = mongoose.model('room' , roomSchema) ;