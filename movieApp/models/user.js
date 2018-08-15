const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
   username:String,
   password: String,
   firstName: String,
   lastName :String,
   email:{
       required:true,
       type:String,
       unique:true
   },
   admin:Boolean

});

UserSchema.plugin(passportLocalMongoose);
 
module.exports = mongoose.model("User", UserSchema);

