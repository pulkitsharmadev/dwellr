const User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async (req,res)=>{
    try{
        let {username,password,email}=req.body;
        let newUser=new User({
            username:username,
            email:email
        });
        let registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        if(registeredUser){
            req.login(registeredUser,(err)=>{
                if(err){next(err)};
                req.flash("success","Welcome to Dwellr");
                res.redirect("/listings");
            })
        }
    }catch(err){
        req.flash("success","You are Already Registered");
        res.redirect('/login');
    }
};


module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async (req,res)=>{
        req.flash("success","Welcome to Dwellr");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);   
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        res.redirect("/listings");
    })
}