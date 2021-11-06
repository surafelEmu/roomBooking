const app = require('./index.js')
const connectDatabase = require('./config/database') ;
const cloudinary = require('cloudinary') ;


connectDatabase() ;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(4000 , () => {
    console.log('successfully stablished server' + 4000) ;
})