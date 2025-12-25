const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    items: [
      {
        product: { 
          type: mongoose.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        variantId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                size: String,
                color: String,
                material: String,
                itemWeight: Number,
                price: Number,
                quantity: Number,
                subtotal: Number
            }
    ],

    // Delivery Address (user address at checkout)
    deliveryAddress: {
      fullName: String,
      phone: String,
      pincode: String,
      state: String,
      city: String,
      houseNo: String,
      area: String,
      landmark: String,
      addressType: String
    },

    // Payment Details
    paymentMethod: {
      type: String,
      enum: ["stripe", "razorpay", "cod"],
      default: "cod"
    },

    paymentId: {
      type: String, // Razorpay ID / Stripe session ID / null for COD
      default: null 
    },

    paymentStatus: { 
      type: String, 
      enum: ["pending", "paid", "failed", "refunded"], 
      default: "pending" 
    },

    // Order Status Flow
    orderStatus: { 
      type: String, 
      enum: ["processing", "confirmed", "shipped", "delivered", "cancelled"], 
      default: "processing" 
    },

    totalAmount: {
            type: Number,
            required: true
        },


    // Billing Summary ///////////////////////////////// late
    subtotal: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },

    totalAmount: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
