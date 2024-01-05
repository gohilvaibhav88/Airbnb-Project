const Listing = require('../models/listing')

module.exports.create = async (req, res, next) => {
    
    const newListing = new Listing(req.body.listing);
    newListing.owner  = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing was Created");
    res.redirect("/listings");
}

module.exports.index = async (req, res) => {
    
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}

module.exports.newListings = function(req, res) {
    
    res.render('listings/new.ejs');
}

module.exports.showListing = async function(req, res, next) {
    let { id } = req.params;
    const listing = await Listing.findById(id)
  .populate({ path: "reviews", populate: { path: "author" } })
  .populate("owner");
    res.render('listings/show.ejs', { listing });
    
}


module.exports.editListing = async function(req, res, next) {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    res.render('listings/edit.ejs', { listing });
}

module.exports.updateListing = (async function(req, res, next) {
   
    let { id } = req.params;
     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing was Updated");
    res.redirect(`/listings/${id}`);  
})

module.exports.deleteListing = async function(req, res, next) {
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing was deleted!!");
    res.redirect('/listings');
}