const User = require("../models/user")
const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js")
const passport = require('passport')
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controllers/users.js");
const user = require('../models/user');

module.exports.postSignup = async (req, res)=>{
    
    try{
    let {username , email , password} = req.body;
    let newUser = new User({email, username});
    let registerUser = await User.register(newUser , password);
    console.log(registerUser);
    req.login(registerUser , function(err) {
        if (err) { return next(err); }
        req.flash("success" , "Welcome to Airbnb ");
        res.redirect("/listings");
      });
    }catch(e){
        req.flash("error" , e.message);
        res.redirect('/signup');
    }
  }


module.exports.signup = (req, res)=>{
    res.render('users/signup.ejs')
}


module.exports.login = (req, res)=>{
    res.render('users/login.ejs');
  }

  module.exports.postLogin = (req, res)=>{
    req.flash('success', "Welcome Back to Airbnb");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("success" , "You are Logged Out Successfully")
      res.redirect('/listings');
    });
  }