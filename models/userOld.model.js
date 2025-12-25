const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    userId: {
      type: String,
      trim: true,
      unique:true,
      required: true,
    },
    accountId: {
      type: String,
      unique:true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isProfile: {
      type: Boolean,
      default: false,
    },
    via: {
      type: String,
      required:true,
    },
    emailToken: {
      type: String,
      required:false,
    },
    resetToken: {
      type: String,
      required:false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
