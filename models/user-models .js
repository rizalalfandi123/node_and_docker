const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password cannot be emptyy"],
    min: [8, "Minimal 8 character for password"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
