const mongoose = require('mongoose') ;
const validator = require('validator');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;
const crypto = require('crypto') ;

const userSchema = mongoose.Schema({
    name: {
        type: String ,
        required: [true , 'please insert your name'] ,
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
        maxLength: [10 , 'your user name should not be more than 10 charactors']
    } ,
    password: {
        type: String ,
        requried: [true , 'please provide password'] ,
        minlength: [6 , 'Your password must be more than 6 charactors'] ,
        select: false 
    } ,
    avatar: {
        public_id: {
            type: String ,
            required: true
        } ,
        url: {
            type: String ,
            required: true 
        }
    } ,
    role: {
        type: String ,
        default: 'user'
    } ,
    createdAt: {
        type: Date ,
        default: Date.now
    } ,
    resetPasswordToken: String ,
    resetPasswordExpire: Date
}) ;

userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) {
        next() ;
    }

    this.password = await bcrypt.hash(this.password , 10) ;
}) ;

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password) ;
}

userSchema.methods.getJwtToken =  function() {
    return  jwt.sign({ id: this._id} , process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRES_TIME
    }) ;
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex') ;

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex') ;

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('user' , userSchema) ;
