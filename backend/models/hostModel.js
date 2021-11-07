const mongoose = require('mongoose') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcryptjs') ;
const crypto = require('crypto') ;
const validator = require('validator') ;

const hostSchema = mongoose.Schema({
    name: {
        type: String ,
        required: [true , 'please insert your Service Provider name'] ,
        maxLength: [30 , 'your name cannot be more than 30 charactors']
    } ,
    email: {
        type: String ,
        required: [true , 'please enter your email address'] ,
        unique: true ,
        validator: [validator.isEmail , 'please provide a valid email']
    } ,
    phone: {
        type: Number ,
        required: [true , 'please provide a phone number'] ,
        validator: [validator.phone , 'please provide a valid phone number'] 

    } ,
    username: {
        type: String ,
        unique: [true  , 'This user name is taken'] ,
        maxLength: [30 , 'your user name should not be more than 10 charactors']
    } ,
    address: [{
        country: String ,
        city: String ,
        street: String 
    }] ,
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
    } ],
    createdAt: {
        type: Date ,
        default: Date.now
    } ,
    resetPasswordToken: String ,
    resetPasswordExpire: Date
}) ;

module.exports = mongoose.model('host' , hostSchema) ;