const app = require('./index.js')
const connectDatabase = require('./config/database') ;

connectDatabase() ;

app.listen(4000 , () => {
    console.log('successfully stablished server' + 4000) ;
})