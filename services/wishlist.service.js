// const userDao = require("../daos/user.dao");
const log = require("../configs/logger.config");
const Wishlist = require("../models/wishlist.model")
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");



class wishlistService {
    async addToWishlist(req, res) {
        try {
            const userId = req.user._id;
            const { productId } = req.body;

            // Validate input
            if (!productId) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.ALL_FIELDS_REQUIRED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Find or create wishlist
            let wishlist = await Wishlist.findOne({ user: userId });

            if (!wishlist) {
                wishlist = await Wishlist.create({
                    user: userId,
                    products: [productId],
                });

                return sendSuccess(
                    res,
                    RESPONSE_MESSAGES.WISHLIST_ADD_SUCCESS,
                    STATUS_CODES.CREATED,
                    { wishlist }
                );
            }

            // Check duplicate product
            if (wishlist.products.includes(productId)) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PRODUCT_ALREADY_IN_WISHLIST,
                    STATUS_CODES.CONFLICT
                );
            }

            wishlist.products.push(productId);
            await wishlist.save();

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.WISHLIST_ADD_SUCCESS,
                STATUS_CODES.SUCCESS,
                { wishlist }
            );

        } catch (error) {
            log.error("error from [WISHLIST SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// getWishlist //

    async getWishlist(req, res) {
        try {
          const userId = req.user._id;
      
          const wishlist = await Wishlist.findOne({ user: userId })
            .populate("products", "name price description image");
      
          // If wishlist not found, return empty list
          if (!wishlist) {
            return sendSuccess(
              res,
              RESPONSE_MESSAGES.WISHLIST_FETCH_SUCCESS,
              STATUS_CODES.SUCCESS,
              { products: [] }
            );
          }
      
          // Success response
          return sendSuccess(
            res,
            RESPONSE_MESSAGES.WISHLIST_FETCH_SUCCESS,
            STATUS_CODES.SUCCESS,
            { wishlist }
          );
      
        } catch (error) {
          log.error("error from [WISHLIST SERVICE]: ", error);
      
          return sendFail(
            res,
            error.message || RESPONSE_MESSAGES.SERVER_ERROR,
            error.status || STATUS_CODES.SERVER_ERROR
          );
        }
      }
      
// removeFromWishlist //

      async removeFromWishlist(req, res) {
        try {
          const userId = req.user._id;
          const { productId } = req.body;
      
          // Validate input
          if (!productId) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.ALL_FIELDS_REQUIRED,
              STATUS_CODES.BAD_REQUEST
            );
          }
      
          // Find wishlist
          const wishlist = await Wishlist.findOne({ user: userId });
          if (!wishlist) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.WISHLIST_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Check product exists in wishlist
          const exists = wishlist.products.some(
            (id) => id.toString() === productId
          );
      
          if (!exists) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.PRODUCT_NOT_IN_WISHLIST,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Remove product
          wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
          );
      
          await wishlist.save();
      
          //Success response
          return sendSuccess(
            res,
            RESPONSE_MESSAGES.WISHLIST_REMOVE_SUCCESS,
            STATUS_CODES.SUCCESS,
            { wishlist }
          );
      
        } catch (error) {
          log.error("error from [WISHLIST SERVICE]: ", error);
      
          return sendFail(
            res,
            error.message || RESPONSE_MESSAGES.SERVER_ERROR,
            error.status || STATUS_CODES.SERVER_ERROR
          );
        }
      }
      
}

module.exports = new wishlistService();