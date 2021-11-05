const mongoose = require('mongoose') ;
const express = require('express') ;

const route = express.Router() ;

const userController = require('../controller/userController') ;

route.post('/' , userController.createNewuser) ;
route.get('/:id' , userController.getSingleUser) ;
route.get('/' , userController.getAllUsers) ;
route.post('/login' , userController.login) ;
route.post('/forgotPassword', userController.forgotPassword) ;
route.post('/resetPassword' , userController.resetPassword) ;
module.exports = route ;