const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passWord: { type: String, required: true },
  fullName: { type: String, required: true },
  userType: { type: String, required: true }, // enum de chac nhap dung  ; 
  phone: { type: Number, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  registerDate: { type: Date, default: new Date().getTime() },
  numberOfTrip: { type: Number },
  numberOfKms: { type: Number },
  avatar: { type: String },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model('User',UserSchema);

module.exports = {UserSchema,User}