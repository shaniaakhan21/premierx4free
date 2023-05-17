const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      fullname:{
        type:String,
        
      },
      phonenumber:{
        type:String,
        
      },
      address:{
        type:String
      },
      city:{
        type:String
      },
      state:{
        type:String
      },
      zipcode:{
        type:Number
      },
      referredBy:{
        type:String
      },
      referralLink:{
        type:String
      }


})

module.exports = mongoose.model("User",userSchema)