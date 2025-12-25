const mongoose = require("mongoose");

// Address Schema //
const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        match: /^[0-9]{10}$/ 
    },
    pincode: {
        type: String,
        trim: true,
        match: /^[0-9]{6}$/
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    houseNo: {
        type: String,
        trim: true,
    },
    area: {
        type: String,
        trim: true,
    },
    landmark: {
        type: String,
        trim: true,
    },
    addressType: { 
        type:String,
         enum: ["Home","Office"], 
         default :"Home",
        },
},
    { timestamps: true }
);

// User Schema //
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    addresses: [addressSchema]    // address
},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
