const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const PDFDocument = require("pdfkit");
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");

class OrderService {
    async checkoutCOD(req, res) {
        try {
            const userId = req.user.id;
            const { addressId } = req.body;

            // Find user
            const user = await User.findById(userId);
            if (!user) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.USER_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Validate address
            const address = user.addresses.id(addressId);
            if (!address) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.INVALID_ADDRESS,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Get cart
            const cart = await Cart.findOne({ user: userId });
            if (!cart || cart.items.length === 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.CART_EMPTY,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Create order (COD)
            const order = await Order.create({
                user: userId,
                items: cart.items,
                deliveryAddress: address,
                paymentMethod: "cod",
                paymentStatus: "pending",
                orderStatus: "processing",
                totalAmount: cart.total,
            });

            // (OPTIONAL but RECOMMENDED) Reduce stock
            for (const item of cart.items) {
                await Product.updateOne(
                    { _id: item.product, "variants._id": item.variantId },
                    { $inc: { "variants.$.stock": -item.quantity } }
                );
            }

            // Clear cart after order placed
            cart.items = [];
            cart.total = 0;
            await cart.save();

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.ORDER_PLACED_SUCCESS,
                STATUS_CODES.CREATED,
                {
                    orderId: order._id,
                    order,
                }
            );

        } catch (error) {
            log.error("error from [CHECKOUT COD SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// getUserOrders// 

    async getUserOrders(req, res) {
        try {
            const userId = req.user.id;

            const orders = await Order.find({ user: userId })
                .sort({ createdAt: -1 })
                .populate("items.product");

            return sendSuccess(
                res,
                RESPONSE_MESSAGES.ORDER_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                {
                    count: orders.length,
                    orders,
                }
            );

        } catch (error) {
            log.error("error from [ORDER SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// generateInvoice //

    async generateInvoice(req, res) {
        try {
            const { id } = req.params;

            // Fetch order
            const order = await Order.findById(id)
                .populate("items.product");

            if (!order) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.ORDER_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            const filename = `invoice-${order._id}.pdf`;

            // Set headers
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${filename}"`
            );

            const doc = new PDFDocument({ margin: 40 });
            doc.pipe(res);

            /* ---------------- HEADER ---------------- */
            doc
                .fontSize(22)
                .text("INVOICE", { align: "center" })
                .moveDown();

            doc.fontSize(12);
            doc.text(`Order ID: ${order._id}`);
            doc.text(`Payment Method: ${order.paymentMethod}`);
            doc.text(`Payment Status: ${order.paymentStatus}`);
            doc.text(`Order Status: ${order.orderStatus}`);
            doc.text(`Date: ${order.createdAt.toDateString()}`);
            doc.moveDown();

            /* ---------------- ADDRESS ---------------- */
            if (order.deliveryAddress) {
                doc.fontSize(14).text("Delivery Address:");
                doc.fontSize(12);
                const addr = order.deliveryAddress;
                doc.text(
                    `${addr.fullName}\n${addr.houseNo}, ${addr.area}\n${addr.city}, ${addr.state} - ${addr.pincode}\nPhone: ${addr.phone}`
                );
                doc.moveDown();
            }

            /* ---------------- ITEMS ---------------- */
            doc.fontSize(14).text("Items:");
            doc.moveDown(0.5);

            order.items.forEach((item, index) => {
                doc.fontSize(12).text(
                    `${index + 1}. ${item.product.name}
              Qty: ${item.quantity}
              Price: ₹${item.price}
              Subtotal: ₹${item.subtotal}`
                );
                doc.moveDown(0.5);
            });

            /* ---------------- TOTAL ---------------- */
            doc.moveDown();
            doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, {
                align: "right",
            });

            doc.moveDown(2);
            doc.fontSize(10).text(
                "Thank you for shopping with us!",
                { align: "center" }
            );

            doc.end();

        } catch (error) {
            log.error("error from [INVOICE SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }
}
module.exports = new OrderService();