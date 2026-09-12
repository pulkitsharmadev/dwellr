const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportMongooseLocal=require("passport-local-mongoose").default;

const userSchema=new Schema({           
    email:{                         //username and password fields will automatically implemented
        type:String,
        required:true
    }
});

userSchema.plugin(passportMongooseLocal);

module.exports=mongoose.model("User",userSchema);