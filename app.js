if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExperssError.js");
const session=require("express-session");
const {MongoStore}=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

app.set("view engine","ejs");       
app.set("views",path.join(__dirname,"/views"));
app.use(express.static("public"));
app.use("/assets",express.static(path.join(__dirname,"assets")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);


//DB Connection establishment
const mongoose=require("mongoose");
const DB_URL=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("DB Connected Successfuly");
}).catch((err)=>{
    console.log("Some Error in DB",err.message);
});

async function main(){
    await mongoose.connect(DB_URL);
};

const store=MongoStore.create({
    mongoUrl:DB_URL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
});

store.on("error",(err)=>{
    console.error("Error in MONGO STORE",err.message);
})

const sessionOption={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});


//Handling Routes
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//Global Error
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not Found!!"));
});

//Error Handler
app.use((err,req,res,next)=>{
    let {status=500,message="Something went Wrong"}=err;
    res.status(status).render("error.ejs",{err});
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});