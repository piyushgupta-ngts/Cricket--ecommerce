// const userDao = require("../daos/user.dao");
const log = require("../configs/logger.config");
const calculateCart = require("../utils/helpers/cartCalculator.util")
const Cart = require("../models/cart.model")
const Product = require("../models/product.model")
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");

class CartService {
    async addToCart(req, res) {
        try {
            const { productId, variantId, quantity } = req.body;
            const userId = req.user.id;

            //  validation
            if (!productId || !variantId || !quantity || quantity <= 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.ALL_FIELDS_REQUIRED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Find product
            const product = await Product.findById(productId);
            if (!product) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PRODUCT_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            //  Find variant
            const variant = product.variants.id(variantId);
            console.log("Incoming variant:", variant);
            console.log("Incoming variantId:", variantId);
            console.log("Product variants:", product.variants);
            if (!variant) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.INVALID_VARIANT,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            //  Stock check
            if (variant.stock < quantity) {
                return sendFail(
                    res,
                    `Only ${variant.stock} items available in stock`,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Price logic      product.discountPrice || product.price;
            // Final price logic
            const finalPrice =
                product.discountPrice > 0
                    ? product.price - product.discountPrice
                    : product.price;

            // Find or create cart
            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ user: userId, items: [], total: 0 });
            }

            // Check if same product + variant exists
            const existingItem = cart.items.find(
                (item) =>
                    item.product.toString() === productId &&
                    item.variantId.toString() === variantId
            );

            if (existingItem) {
                if (existingItem.quantity + quantity > variant.stock) {
                    return sendFail(
                        res,
                        `You can add maximum ${variant.stock} items`,
                        STATUS_CODES.BAD_REQUEST
                    );
                }

                existingItem.quantity += quantity;
                existingItem.subtotal = existingItem.quantity * finalPrice;
            } else {
                cart.items.push({
                    product: productId,
                    variantId,
                    quantity,
                    price: finalPrice,
                    size: variant.size,
                    color: variant.color,
                    material: variant.material,
                    itemWeight: variant.itemWeight,
                    subtotal: quantity * finalPrice,
                });
            }

            // Recalculate cart total
            cart.total = cart.items.reduce(
                (acc, item) => acc + item.subtotal,
                0
            );

            await cart.save();

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.ITEM_ADDED_TO_CART,
                STATUS_CODES.SUCCESS,
                { cart }
            );

        } catch (error) {
            log.error("error from [CART SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    // getCart //

    async getCart(req, res) {
        try {
            const userId = req.user.id;

            // Find cart and populate product details
            const cart = await Cart.findOne({ user: userId })
                .populate("items.product", "name price description image")
                .lean();

            // If cart not found, return empty cart
            if (!cart) {
                return sendSuccess(
                    res,
                    RESPONSE_MESSAGES.CART_EMPTY,
                    STATUS_CODES.SUCCESS,
                    {
                        user: userId,
                        items: [],
                        total: 0,
                    }
                );
            }

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.CART_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                cart
            );

        } catch (error) {
            log.error("error from [CART SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    // getCartCount //

    async getCartCount(req, res) {
        try {
            const userId = req.user.id;

            // Find cart
            const cart = await Cart.findOne({ user: userId });

            // Empty cart case
            if (!cart) {
                return sendSuccess(
                    res,
                    RESPONSE_MESSAGES.CART_COUNT_FETCH_SUCCESS,
                    STATUS_CODES.SUCCESS,
                    {
                        totalItems: 0,
                        totalQuantity: 0,
                    }
                );
            }

            //Count unique items
            const totalItems = cart.items.length;

            // Count total quantity
            const totalQuantity = cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.CART_COUNT_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                {
                    totalItems,
                    totalQuantity,
                }
            );

        } catch (error) {
            log.error("error from [CART SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }


    async updateCartQty(req, res) {
        try {
            const { productId, variantId, quantity } = req.body;
            const userId = req.user.id;

            // Negative quantity not allowed
            if (quantity < 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.INVALID_QUANTITY,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            //Find product
            const product = await Product.findById(productId);
            if (!product) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PRODUCT_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Find variant
            const variant = product.variants.id(variantId);
            if (!variant) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.INVALID_VARIANT,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Find cart
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.CART_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Find cart item
            const item = cart.items.find(
                (it) =>
                    it.product.toString() === productId &&
                    it.variantId.toString() === variantId
            );

            if (!item) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.CART_ITEM_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Remove item if quantity = 0
            if (quantity === 0) {
                cart.items = cart.items.filter(
                    (it) =>
                        !(
                            it.product.toString() === productId &&
                            it.variantId.toString() === variantId
                        )
                );
            } else {
                //Stock check
                if (quantity > variant.stock) {
                    return sendFail(
                        res,
                        `Only ${variant.stock} items available in stock`,
                        STATUS_CODES.BAD_REQUEST
                    );
                }

                // Price calculation
                const finalPrice =
                    product.discountPrice > 0
                        ? product.price - product.discountPrice
                        : product.price;

                // +,- Update quantity
                item.quantity = quantity;
                item.subtotal = quantity * finalPrice;
            }

            // Recalculate cart total
            cart.total = cart.items.reduce(
                (acc, item) => acc + item.subtotal,
                0
            );

            await cart.save();

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.CART_QTY_UPDATE_SUCCESS,
                STATUS_CODES.SUCCESS,
                { cart }
            );

        } catch (error) {
            log.error("error from [CART SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    // Remove Item From Cart
    
    async removeFromCart(req, res) {
        try {
          const { productId, variantId } = req.body;
          const userId = req.user.id;
      
          // Validate input
          if (!productId || !variantId) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.ALL_FIELDS_REQUIRED,
              STATUS_CODES.BAD_REQUEST
            );
          }
      
          // Find cart
          const cart = await Cart.findOne({ user: userId });
          if (!cart) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.CART_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Find item index
          const itemIndex = cart.items.findIndex(
            (item) =>
              item.product.toString() === productId &&
              item.variantId.toString() === variantId
          );
      
          if (itemIndex === -1) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.CART_ITEM_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Remove item (mongoose-safe)
          cart.items.splice(itemIndex, 1);
      
          // Recalculate cart total
          cart.total = cart.items.reduce(
            (acc, item) => acc + item.subtotal,
            0
          );
      
          await cart.save();
      
          //Success response
          return sendSuccess(
            res,
            RESPONSE_MESSAGES.ITEM_REMOVED_FROM_CART,
            STATUS_CODES.SUCCESS,
            { cart }
          );
      
        } catch (error) {
          log.error("error from [CART SERVICE]: ", error);
      
          return sendFail(
            res,
            error.message || RESPONSE_MESSAGES.SERVER_ERROR,
            error.status || STATUS_CODES.SERVER_ERROR
          );
        }
      }
      
}
module.exports = new CartService();