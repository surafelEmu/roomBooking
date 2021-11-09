const express = require('express')  ;
const router = express.Router() ;

const reservationController = require('../controller/reservationController') ;
const {AuthenticateUser , authorizeRoles} = require('../middleware/auth') ;

router.route('/').post( AuthenticateUser ,reservationController.createReservation) 
                .get(reservationController.getAllReservations) ;
router.route('/:id').put( AuthenticateUser , reservationController.updateReservation)
                .get(reservationController.getSingleReservation)
                .put(reservationController.updateReservation)
                .delete(reservationController.deleteReservation)

                
module.exports = router ;