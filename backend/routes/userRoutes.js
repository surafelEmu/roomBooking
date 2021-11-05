const mongoose = require('mongoose') ;
const express = require('express') ;

const route = express.Router() ;

const userController = require('../controller/userController') ;

route.post('/' , userController.createNewuser) ;
route.get('/:id' , userController.getSingleUser) ;
route.get('/' , userController.getAllUsers) ;
route.post('/login' , userController.login) ;
route.post('/forgotPassword', userController.forgotPassword) ;
route.post('/resetPassword/:token' , userController.resetPassword) ;
route.post('/logout' , userController.logoutUser) ;
route.delete('/remove/:id' , userController.deleteUser) ;
route.put('/updateUser/:id' , userController.updateUser ) ;
route.put('/updateProfile/:id' , userController.updateProfile ) ;
route.post('/send' , userController.testEmail) ;

module.exports = route ;