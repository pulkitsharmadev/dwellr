const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listings.js");

//Connection establishment
const MONGO_URL="mongodb://localhost:27017/Dwellr";

main().then(()=>{
    console.log("DB Connected Successfuly");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

let initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"6a9d0e7cdac75fcec1896d08"
    }));
    await Listing.insertMany(initData.data);
    console.log("DB initialized successfully");
}
initDB();