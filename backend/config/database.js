const mongoose = require('mongoose') ;

console.log(process.env.DB_LOCAL_URI) ;
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI , {
        useNewUrlParser: true ,
        useUnifiedTopology: true , 
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB database connected with HOST: ${con.connection.host}`) ;
    })
}

module.exports = connectDatabase ;