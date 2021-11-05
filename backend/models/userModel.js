const mongoose = require('mongoose') ;
const validator = require('validator');
const bcrypt = require('bcryptjs') ;
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
    }
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

module.exports = mongoose.model('user' , userSchema) ;
