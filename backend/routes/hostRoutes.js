const hostController = require('../controller/hostController') ;
const {AuthenticateUser , authorizeRoles} = require('../middleware/auth')

const express = require('express') ;
const router = express.Router() ;

router.route('/').post(AuthenticateUser , authorizeRoles('admin') ,hostController.createHost) 
                .get(hostController.getAllHosts) ;
router.route('/:id').get(hostController.getSinglehost)
                .put(AuthenticateUser , authorizeRoles('admin') ,hostController.updateProfile)
                .delete(AuthenticateUser , authorizeRoles('admin') ,hostController.deletehost)
                

module.exports = router ;