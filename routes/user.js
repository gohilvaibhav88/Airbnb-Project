const express = require('express');
const router = express.Router();
const User = require("../models/user")
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require('passport')
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controllers/users.js");
const user = require('../models/user');


router.get('/signup' , (userController.signup))

router.post('/signup', wrapAsync(userController.postSignup))

router.get('/login' , (userController.login))

router.post('/login', saveRedirectUrl ,passport.authenticate('local', {failureRedirect : '/login' , failureFlash : true}), (userController.postLogin))

router.get('/logout', (userController.logout));


module.exports = router;