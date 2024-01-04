const express = require('express');
const router = express.Router();
const User = require("../models/user")
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require('passport')
const {saveRedirectUrl} = require("../middleware.js")


router.get('/signup' , (req, res)=>{
    res.render('users/signup.ejs')
})

router.post('/signup', wrapAsync(async (req, res)=>{
    
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
}))

router.get('/login' , (req, res)=>{
    res.render('users/login.ejs');
})

router.post('/login', saveRedirectUrl ,passport.authenticate('local', {failureRedirect : '/login' , failureFlash : true}), (req, res)=>{
    req.flash('success', "Welcome Back to Airbnb");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
})

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("success" , "You are Logged Out Successfully")
      res.redirect('/listings');
    });
  });


module.exports = router;