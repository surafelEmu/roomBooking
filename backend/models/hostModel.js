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
        maxLength: [10 , 'your user name should not be more than 10 charactors']
    } ,
    password: {
        type: String ,
        requried: [true , 'please provide password'] ,
        minlength: [6 , 'Your password must be more than 6 charactors'] ,
        select: false 
    } ,
    // address: [{
    //     country: String ,
    //     city: String ,
    //     street: String 
    // }] ,
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId ,
        required: true ,
        ref: 'user'
    } ,
    createdAt: {
        type: Date ,
        default: Date.now
    } ,
    resetPasswordToken: String ,
    resetPasswordExpire: Date
}) ;

hostSchema.pre('save' , async function(next) {
    this.password = await bcrypt.hash(this.password , 10) ;
})

hostSchema.methods.comparePassword = async(enteredPassword) => {
    return await bcrypt.compare(enteredPassword , this.password) ;
}

hostSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id} , process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

hostSchema.methods.passwordResetToken = () => {
    const resetToken = crypto.randomBytes(20).toString('hex') ;

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex') ;

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('host' , hostSchema) ;