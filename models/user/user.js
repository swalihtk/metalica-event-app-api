// import { Mongoose, Schema as _Schema, Model } from 'mongoose';
const mongoose=require("mongoose");

var UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  profileImage: {
    type: String
  },
  adharNumber: {
    type: String
  },
  passportPhoto: {
    type: String
  },
  address: {
    type: String
  },
  mobileNumber: {
    type: String
  },
  alternativeNumber: {
    type: String
  }
});

module.exports= new mongoose.model("users", UserSchema);