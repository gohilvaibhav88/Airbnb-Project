const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError.js');
// const {listingSchema} = require('../schema.js')
const Review = require('../models/review.js');
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const reviewSchema = require('../models/review.js');
const reviewController = require("../controllers/reviews.js")


const validateReview = (req, res ,next )=>{
    let {error} = reviewSchema.validate(req.body); 
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);

    }else{
        next();
    }
}


//Review
//Post route
router.post('/' , isLoggedIn, validateReview , wrapAsync(reviewController.postReview));


module.exports = router;