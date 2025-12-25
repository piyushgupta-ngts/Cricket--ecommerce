const userDao = require("../daos/user.dao");
const log = require("../configs/logger.config");
const fs = require("fs");
const path = require("path");
const { validateServiceData } = require("../utils/helpers/productValidate.util")
const Product = require("../models/product.model")
const Category = require("../models/category.model")
const mongoose = require("mongoose");
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");


class ProductService {
    async createProduct(req, res) {
        try {
            const {
                name,
                description,
                price,
                discountPrice,
                sku,
                brand,
                category,
                tags,
                variants,
                rating,
            } = req.body;

            const imageUrl = req.file
                ? `/uploads/products/${req.file.filename}`
                : null;

            // Basic validation
            if (!name || !price || !sku || !brand || !category) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.ALL_FIELDS_REQUIRED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Validate category
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.INVALID_CATEGORY,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Check SKU uniqueness
            const skuExists = await Product.findOne({ sku });
            if (skuExists) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.SKU_ALREADY_EXISTS,
                    STATUS_CODES.CONFLICT
                );
            }

            // Create product
            const product = await Product.create({
                name,
                description,
                price,
                discountPrice,
                sku,
                rating,
                brand,
                category,
                tags: tags ? tags.split(",") : [],
                variants: variants ? JSON.parse(variants) : [],
                image: imageUrl,
                createdBy: req.user.id,
            });

            // Populate category
            const populatedProduct = await Product.findById(product._id)
                .populate("category");

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.PRODUCT_CREATE_SUCCESS,
                STATUS_CODES.CREATED,
                { product: populatedProduct }
            );

        } catch (error) {
            log.error("error from [PRODUCT SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }




    async advancedSearch(req, res) {

    }


    // async AllService(req, res) {
    //     try {
    //         const products = await Product.find().populate("category");
    //         res.json({ success: true, products });
    //     }catch (err) {
    //         res.status(500).json({ message: "Internal server error" });
    //     }

    // }

// getProductById//

    async getProductById(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findById(id)
                .populate("category");

            if (!product) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PRODUCT_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            return sendSuccess(
                res,
                RESPONSE_MESSAGES.PRODUCT_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                { product }
            );

        } catch (error) {
            log.error("error from [PRODUCT SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// updateProduct //

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updates = { ...req.body };

            // Find product
            const product = await Product.findById(id);
            if (!product) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PRODUCT_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Handle image update
            if (req.file) {
                const newImagePath = `/uploads/products/${req.file.filename}`;
                updates.image = newImagePath;

                // Delete old image if exists
                if (product.image) {
                    const oldImagePath = path.join(
                        __dirname,
                        "../..",
                        product.image
                    );
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            }

            // Parse variants JSON (if provided)
            if (updates.variants) {
                try {
                    updates.variants = JSON.parse(updates.variants);
                } catch (err) {
                    return sendFail(
                        res,
                        RESPONSE_MESSAGES.INVALID_VARIANTS_FORMAT,
                        STATUS_CODES.BAD_REQUEST
                    );
                }
            }

            // Update product
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                updates,
                { new: true, runValidators: true }
            ).populate("category");

            //Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.PRODUCT_UPDATE_SUCCESS,
                STATUS_CODES.SUCCESS,
                { product: updatedProduct }
            );

        } catch (error) {
            log.error("error from [PRODUCT SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// deleteProduct //

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            // Find product
            const product = await Product.findById(id);
            if (!product) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PRODUCT_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Delete product image (if exists)
            if (product.image) {
                const imagePath = path.join(
                    __dirname,
                    "../..",
                    product.image
                );

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // Delete product
            await Product.findByIdAndDelete(id);

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.PRODUCT_DELETE_SUCCESS,
                STATUS_CODES.SUCCESS
            );

        } catch (error) {
            log.error("error from [PRODUCT SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// VARIANT UPDATE ///

    async updateProductVariant(req, res) {
        try {
          const { id, variantId } = req.params;
      
          // Find product
          const product = await Product.findById(id);
          if (!product) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.PRODUCT_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Find variant (subdocument)
          const variant = product.variants.id(variantId);
          if (!variant) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.VARIANT_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Update variant fields
          Object.assign(variant, req.body);
      
          await product.save();
      
          // Success response
          return sendSuccess(
            res,
            RESPONSE_MESSAGES.VARIANT_UPDATE_SUCCESS,
            STATUS_CODES.SUCCESS,
            { variants: product.variants }
          );
      
        } catch (error) {
          log.error("error from [VARIANT SERVICE]: ", error);
      
          return sendFail(
            res,
            error.message || RESPONSE_MESSAGES.SERVER_ERROR,
            error.status || STATUS_CODES.SERVER_ERROR
          );
        }
      }
      
    //// SEARCH PRODUCT + FILTER ////

    async searchProducts(req, res) {
        try {

        } catch (error) {

        }
    }











}

module.exports = new ProductService();