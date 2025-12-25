const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");


class ReviewService {
    async addReview(req, res) {
        try {
            const userId = req.user._id;
            const { productId, rating, comment } = req.body;

            // Validate input
            if (!productId || !rating) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.RATING_REQUIRED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Check if user purchased & order delivered
            const hasOrdered = await Order.findOne({
                user: userId,
                "items.product": productId,
                orderStatus: "delivered",
            });

            if (!hasOrdered) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.REVIEW_NOT_ALLOWED,
                    STATUS_CODES.FORBIDDEN
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

            // Check if already reviewed
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === userId.toString()
            );

            if (alreadyReviewed) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.ALREADY_REVIEWED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Add review
            const review = {
                user: userId,
                name: req.user.name,
                rating,
                comment,
            };

            product.reviews.push(review);

            // Update average rating
            const totalRating = product.reviews.reduce(
                (sum, r) => sum + r.rating,
                0
            );

            product.rating = Number(
                (totalRating / product.reviews.length).toFixed(1)
            );
            product.totalReviews = product.reviews.length;

            await product.save();

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.REVIEW_ADDED_SUCCESS,
                STATUS_CODES.CREATED,
                {
                    review,
                    averageRating: product.rating,
                    totalReviews: product.totalReviews,
                }
            );

        } catch (error) {
            log.error("error from [REVIEW SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }


    }

    async getProductReviews(req, res) {
        try {
            const { productId } = req.params;

            // Find product
            const product = await Product.findById(productId);
            if (!product) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PRODUCT_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.REVIEW_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                {
                    reviews: product.reviews,
                    averageRating: product.rating,
                    totalReviews: product.totalReviews,
                }
            );

        } catch (error) {
            log.error("error from [REVIEW SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    async updateReview(req, res) {
        try {
            const userId = req.user._id;
            const { productId, rating, comment } = req.body;
            const { reviewId } = req.params;
        
            // Validate input
            if (!productId || !reviewId || !rating) {
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
        
            // Find review
            const review = product.reviews.id(reviewId);
            if (!review) {
              return sendFail(
                res,
                RESPONSE_MESSAGES.REVIEW_NOT_FOUND,
                STATUS_CODES.NOT_FOUND
              );
            }
        
            // Check review ownership
            if (review.user.toString() !== userId.toString()) {
              return sendFail(
                res,
                RESPONSE_MESSAGES.REVIEW_UPDATE_NOT_ALLOWED,
                STATUS_CODES.FORBIDDEN
              );
            }
        
            // Update review fields
            review.rating = rating;
            if (comment !== undefined) review.comment = comment;
        
            // Recalculate average rating
            const totalRating = product.reviews.reduce(
              (sum, r) => sum + r.rating,
              0
            );
        
            product.rating = Number(
              (totalRating / product.reviews.length).toFixed(1)
            );
            product.totalReviews = product.reviews.length;
        
            await product.save();
        
            // Success response
            return sendSuccess(
              res,
              RESPONSE_MESSAGES.REVIEW_UPDATE_SUCCESS,
              STATUS_CODES.SUCCESS,
              {
                review,
                averageRating: product.rating,
                totalReviews: product.totalReviews,
              }
            );
        
          } catch (error) {
            log.error("error from [REVIEW UPDATE SERVICE]: ", error);
        
            return sendFail(
              res,
              error.message || RESPONSE_MESSAGES.SERVER_ERROR,
              error.status || STATUS_CODES.SERVER_ERROR
            );
          }
        

    }

    async deleteReview(req, res) {

    }
}
module.exports = new ReviewService();