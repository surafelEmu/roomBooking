const express = require('express') ;
const bodyParsor = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express() ;

const hostRouter = require('./routes/hostRoutes') ;
const userRouter = require('./routes/userRoutes') ;
const errorMiddleware = require('./middleware/errors') ;

if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path: 'backend/config/config.env'}) ;
app.use(express.json()) ;
app.use(bodyParsor.urlencoded({extended: true})) ;
app.use(fileUpload({useTempFiles: true})) ;


app.use('/api/v1/user' , userRouter )  ;
app.use('/api/v1/host' , hostRouter)


app.use(errorMiddleware) ;

module.exports = app ;