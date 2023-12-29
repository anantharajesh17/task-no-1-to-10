const mongoose = require('mongoose');
const token = require("../middleware/token.js")
const joi = require('joi');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type:joi.string(),
    // require:true,
  },
  email:{
    type:joi.string().email().required(),
    // required:true,
  },
  password:{
    type:joi.string().min(6).required(),
    // required:true,
  },
  token:String
});

const User = mongoose.model("user", userSchema);

module.exports = User;