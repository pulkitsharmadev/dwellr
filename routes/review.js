const express=require("express");
const router=express.Router({mergeParams:true}); // mergeParams is used to merge both parent and child route parameters
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../utils/middleware.js");
const reviewController=require("../controller/reviews.js")



//Post review route
router.post("/",
    isLoggedIn,
    validateReview,wrapAsync(reviewController.createReview));

// Delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));


module.exports=router;
