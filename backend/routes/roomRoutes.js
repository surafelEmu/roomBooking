const roomController = require('../controller/roomController')

const express = require('express') ;

const router = express.Router() ;

router.route('/').get(roomController.getAllRooms) 
                .post(roomController.createRoom) ;
router.route('/:id').get(roomController.getSingleRoom)
                .delete(roomController.deleteRoom)
                .put(roomController.updateRoom) ;

module.exports = router ;