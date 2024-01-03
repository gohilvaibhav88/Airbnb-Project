const express = require('express');
const router = express.Router();
const User = require("../models/user")
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require('passport')

router.get('/signup' , (req, res)=>{
    res.render('users/signup.ejs')
})

router.post('/signup', wrapAsync(async (req, res)=>{
    
    try{
    let {username , email , password} = req.body;
    let newUser = new User({email, username});
    let registerUser = await User.register(newUser , password);
    console.log(registerUser);
    req.flash("success" , "Welcome to Airbnb ");
    res.redirect("/listings");
    }catch(e){
        req.flash("error" , e.message);
        res.redirect('/signup');
    }
}))

router.get('/login' , (req, res)=>{
    res.render('users/login.ejs');
})

router.post('/login', passport.authenticate('local', {failureRedirect : '/login' , failureFlash : true}), (req, res)=>{
    req.flash('success', "Welcome Back to Airbnb");
    res.redirect("/listings");
})


module.exports = router;