const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/middleware.js");
const userController=require("../controller/users.js");

router.get("/privacy",(req,res)=>{
    res.render("privacy.ejs");
});

router.get("/terms",(req,res)=>{
    res.render("terms.ejs");
});

router.get("/company",(req,res)=>{
    res.render("company.ejs");
})

router.get('/help',(req,res)=>{
    res.render("users/help.ejs")
})
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",{
            failureRedirect:"/login",
            failureFlash:true,
        }),
        userController.login);

//LogOut Route
router.get("/logout",userController.logout);

module.exports=router;