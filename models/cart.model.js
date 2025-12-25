const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                variantId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                size: { type: String },
                color: { type: String },
                material:{type:String},
                itemWeight:{type:Number}, 
                price: { type: Number, required: true },
                quantity: { type: Number, required: true, default: 0 },
                subtotal: { type: Number, default: 0 },
            },
        ],

        total: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);






















// const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     qty: { type: Number, required: true, default: 1 },

//     // Save product price at time of adding
//     price: { type: Number, required: true },

//     // Per-item discount (optional)
//     discount: { type: Number, default: 0 } // in %
//   },
//   { _id: false }
// );

// const cartSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     items: [cartItemSchema],

//     // Cart totals
//     subtotal: { type: Number, default: 0 },
//     discountTotal: { type: Number, default: 0 },

//     taxRate: { type: Number, default: 18 }, // GST/VAT = 18% (You can change)
//     taxAmount: { type: Number, default: 0 },

//     grandTotal: { type: Number, default: 0 },
//     itemCount: { type: Number, default: 0 }

//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Cart", cartSchema);
