const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: { type: String, required: true },      /// Reviewer name
        rating: { type: Number, required: true, min: 1, max: 5 },   ///// min 1  , max  5
        comment: { type: String }
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },

        description: {
            type: String,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        discountPrice: {
            type: Number,
            default: 0       /// Final price = price - discountPrice
        },

        sku: {
            type: String,
            unique: true,
            required: true      ///   example: BAT-MRF-1022
        },

        brand: {
            type: String,
            trim: true,
            required: true   //// MRF
        },

        rating: { type: Number,
             required: true,
              min: 1, max: 5 },  ///// min 1   , max 5

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true         ///// category  5
        },
        
        image: {
            type: String,
            trim: true,
            required: false,    // Multiple images 
        },

                // Product variants
        variants: [
            {
                size: { type: String },    // Example: S, M, L, XL
                color: { type: String },   // Example: Red, Blue, White
                stock: { type: Number, default: 0 },    /// variants based stock
                material:{type:String},      // material
                itemWeight:{type:Number},    /// gram
            }
        ],

          ///  Ratings & Reviews
        reviews: [reviewSchema],

        // averageRating: { type: Number, default: 0 },
        // totalReviews: { type: Number, default: 0 },

        // Tags (used for search)
        tags: {
            type: [String],
            default: []
        },

        // ✔ Admin-only fields
        isFeatured: {
            type: Boolean,
            default: false
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

// Text Search Index
productSchema.index({
    name: "text",
    description: "text",
    brand: "text",
    tags: "text"
});

module.exports = mongoose.model("Product", productSchema);



// image: {
//     type: String,
//         trim: true,
//             required: false,
//     },