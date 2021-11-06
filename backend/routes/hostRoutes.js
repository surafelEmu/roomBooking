const hostController = require('../controller/hostController') ;
const {AuthenticateUser , authorizeRoles} = require('../middleware/auth')

const express = require('express') ;
const router = express.Router() ;

router.route('/').post(AuthenticateUser , authorizeRoles('admin') ,hostController.createHost) ;

module.exports = router ;