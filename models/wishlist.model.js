const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        trim: true,
        required: true,
        unique: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            trim: true,
        }
    ]
},
    { timestamps: true }

);

module.exports = mongoose.model("Wishlist", wishlistSchema);
