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
const listingController = require("../controllers/listings.js")
const multer = require('multer');
const {storage} = require('../cloudConfig.js')
const upload = multer({storage });



const validateListing = (req, res , next )=>{
    let {error} = listingSchema.validate(req.body);
    if (error ){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400 , errMsg)
    }else{
        next();
    }
}

router.post('/', upload.single('listing[image]'), (req, res) => {
    res.send(req.file );
});
//index route
router.get("/", wrapAsync (listingController.index));

//new route
router.get("/new", isLoggedIn ,(listingController.newListings));

//show route 
router.get("/:id" ,wrapAsync(listingController.showListing));



//Create Route
router.post("/", validateListing  ,wrapAsync(listingController.create));

//Edit 
router.get("/:id/edit" , isLoggedIn, isOwner  ,wrapAsync((listingController.editListing)));

//update
router.put("/:id", validateListing, isLoggedIn , isOwner ,wrapAsync(listingController.updateListing));

//delete
router.delete('/:id', isLoggedIn , isOwner ,wrapAsync(listingController.deleteListing));


module.exports =  router;