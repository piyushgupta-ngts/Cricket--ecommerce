// const userDao = require("../daos/user.dao");
const log = require("../configs/logger.config");
const { validateCreateCategory } = require("../utils/helpers/categoryValidate.util")
const Category = require("../models/category.model")
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");

class CategoryService {
    async createCategory(req, res) {
        try {
            // Validate request body
            const errors = validateCreateCategory(req.body);
            if (errors.length > 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.VALIDATION_FAILED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const { name } = req.body;

            // Check duplicate category
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.CATEGORY_ALREADY_EXISTS,
                    STATUS_CODES.CONFLICT
                );
            }

            // Create category
            const category = await Category.create({ name });

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.CATEGORY_CREATE_SUCCESS,
                STATUS_CODES.CREATED,
                { category }
            );

        } catch (error) {
            log.error("error from [CATEGORY SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    // getAllCategories //

    async getAllCategories(req, res) {
        try {
            const categories = await Category.find().sort({ createdAt: -1 });

            return sendSuccess(
                res,
                RESPONSE_MESSAGES.CATEGORY_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                { categories }
            );

        } catch (error) {
            log.error("error from [CATEGORY SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    // getCategoryById //

    async getCategoryById(req, res) {
        try {
            const { id } = req.params;

            const category = await Category.findById(id);
            if (!category) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.CATEGORY_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            return sendSuccess(
                res,
                RESPONSE_MESSAGES.CATEGORY_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                { category }
            );

        } catch (error) {
            log.error("error from [CATEGORY SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    // updateCategory //

    async updateCategory(req, res) {
        try {
            // Validate request body
            const errors = validateUpdateCategory(req.body);
            if (errors.length > 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.VALIDATION_FAILED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const { name } = req.body;
            const { id } = req.params;

            // Check duplicate category name (optional but recommended)
            const exists = await Category.findOne({
                name,
                _id: { $ne: id },
            });
            if (exists) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.CATEGORY_ALREADY_EXISTS,
                    STATUS_CODES.CONFLICT
                );
            }

            // Update category
            const category = await Category.findByIdAndUpdate(
                id,
                { name },
                { new: true, runValidators: true }
            );

            if (!category) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.CATEGORY_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.CATEGORY_UPDATE_SUCCESS,
                STATUS_CODES.SUCCESS,
                { category }
            );

        } catch (error) {
            log.error("error from [CATEGORY SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// deleteCategory //

async deleteCategory(req, res) {
    try {
      const { id } = req.params;
  
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return sendFail(
          res,
          RESPONSE_MESSAGES.CATEGORY_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }
  
      return sendSuccess(
        res,
        RESPONSE_MESSAGES.CATEGORY_DELETE_SUCCESS,
        STATUS_CODES.SUCCESS
      );
  
    } catch (error) {
      log.error("error from [CATEGORY SERVICE]: ", error);
  
      return sendFail(
        res,
        error.message || RESPONSE_MESSAGES.SERVER_ERROR,
        error.status || STATUS_CODES.SERVER_ERROR
      );
    }
  }
  
}

module.exports = new CategoryService();