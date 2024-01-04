const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require('../utils/ExpressError.js')
const {listingSchema} = require('../schema.js')
const Listing = require("../models/listing.js")
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user.js');
const {isLoggedIn , isOwner} = require('../middleware.js')

const validateListing = (req, res , next )=>{
    let {error} = listingSchema.validate(req.body);
    if (error ){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400 , errMsg)
    }else{
        next();
    }
}
//index route
router.get("/", wrapAsync (async (req, res) => {
    
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}));

//new route
router.get("/new", isLoggedIn ,function(req, res) {
    
    res.render('listings/new.ejs');
});

//show route 
router.get("/:id" ,wrapAsync(async function(req, res, next) {
    let { id } = req.params;
    const listing = await Listing.findById(id)
  .populate({ path: "reviews", populate: { path: "author" } })
  .populate("owner");
    res.render('listings/show.ejs', { listing });
    
}));



//Create Route
router.post("/", validateListing  ,wrapAsync( async (req, res, next) => {
    
    const newListing = new Listing(req.body.listing);
    newListing.owner  = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing was Created");
    res.redirect("/listings");
}));

//Edit 
router.get("/:id/edit" , isLoggedIn, isOwner  ,wrapAsync(async function(req, res, next) {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    res.render('listings/edit.ejs', { listing });
}));

//update
router.put("/:id", validateListing, isLoggedIn , isOwner ,wrapAsync(async function(req, res, next) {
   
    let { id } = req.params;
     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing was Updated");
    res.redirect(`/listings/${id}`);  
}));

//delete
router.delete('/:id', isLoggedIn , isOwner ,wrapAsync(async function(req, res, next) {
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing was deleted!!");
    res.redirect('/listings');
}));


module.exports =  router;