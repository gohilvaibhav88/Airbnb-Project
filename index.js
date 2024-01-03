const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require('./utils/ExpressError.js')
const {listingSchema} = require('./schema.js')
const Review = require('./models/review.js')
const listings = require("./routes/listing.js")
const reviews = require('./routes/review.js')
const session = require('express-session');
const flash = require('connect-flash')

const MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";



main().then(()=>{
    console.log("Connnected to MongoDb");
}).catch((err)=>{
    console.log(err);
})


app.set("views", path.join(__dirname, "views")) 
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"/public")))


const sessionOptions = {
    secret: "Secret",
    resave: false,
    saveUninitialized: true,
    cokiee :{
        expires : Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        httpOnly : true 
    }
};


async function main(){
    await mongoose.connect(MONGO_URL);
}
 

app.get("/", function(req, res){
    res.send("Hello World");
}) 


app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    next();
})

app.use('/listings' , listings);
app.use('/listings/:id/reviews' , reviews);






app.all('*' ,(req , res , next)=>{
    next(new ExpressError(404 , "Page Not Found"));
})

app.use((err, req, res , next)=>{
    
    let {statusCode = 500 , message = "Something Went Wrong " } = err;
    res.status(statusCode).render("error.ejs", {message})
    // res.status(statusCode).send(message);
}
)

app.listen(8080, ()=>{
    console.log("Connect to server 8080")
}) 