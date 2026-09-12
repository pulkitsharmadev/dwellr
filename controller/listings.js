const Listing=require("../models/listings.js")

module.exports.index=async (req,res)=>{
    const searchLocation=(req.query.location || "").toLowerCase().trim();
    const listings=await Listing.find({});
    const allListings=listings.filter(listing=>{
        if(!searchLocation){
            return true;
        }

        const location=(listing.location || "").toLowerCase();
        const country=(listing.country || "").toLowerCase();

        return location.includes(searchLocation) || country.includes(searchLocation);
    });

    res.render("./listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.createListing=async (req,res)=>{
        const newListing=new Listing(req.body);
        const url=req.file.path;
        const filename=req.file.filename;
        newListing.image={filename,url};
        newListing.owner=req.user._id;  //req.user stores the details of current user.
        await newListing.save();
        req.flash("success","New Listing Added");
        res.redirect("/listings");
};

module.exports.renderUpdateForm=async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for doesn't exist!!");
        res.redirect("/listings");
    }else{
        res.render("./listings/edit.ejs",{listing});
    }
};

module.exports.updateListing=async(req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findByIdAndUpdate(id,req.body,{new:true},{runValidators:true});
    if(typeof req.file!=="undefined"){
        const url=req.file.path;
        const filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req,res)=>{
    const {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    if(!deletedListing){
        req.flash("error","Listing you requested for doesn't exist!!");
        res.redirect("/listings");
    }else{
        console.log(deletedListing);
        req.flash("success","Listing Deleted");
        res.redirect("/listings");
    }
};

module.exports.showListing=async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author"
        }
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for doesn't exist!!");
        res.redirect("/listings");
    }else{
    res.render("./listings/show.ejs",{listing});
    }
}