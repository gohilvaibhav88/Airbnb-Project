const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";

main().then(()=>{
    console.log("Connnected to MongoDb");
}).catch((err)=>{
    console.log(err);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")) 
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")))


async function main(){
    await mongoose.connect(MONGO_URL);
}
 

app.get("/", function(req, res){
    res.send("Hello World");
}) 

app.get("/listings" ,async function(req, res){
    const allListings =   await Listing.find({});
    res.render('listings/index.ejs' , {allListings})
})

app.get("/listings/new", function(req, res){
    res.render('listings/new.ejs' )
})

app.get("/listings/:id" , async function(req, res ){
    let {id} =  req.params ;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', {listing})
})

app.post("/listings", async function(req , res){
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings");
})

//Edit 
app.get("/listings/:id/edit", async function(req, res){
        let {id} = req.params;
        const listing = await Listing.findById(id);
        res.render('listings/edit.ejs', { listing })
})

//update
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });

//delete

app.delete('/listings/:id' ,async  function(req, res){
    let {id} = req.params;
    let deletedList =await Listing.findByIdAndDelete(id);
    console.log(deletedList)
    res.redirect('/listings');
})



  



app.listen(8080, ()=>{
    console.log("Connect to server 8080")
}) 