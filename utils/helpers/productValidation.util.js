const Joi = require("joi");

exports.createProductSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().allow(""),
    price: Joi.number().min(1).required(),
    discountPrice: Joi.number().min(0).optional(),
    sku: Joi.string().min(3).required(),
    brand: Joi.string().min(2).required(),
    category: Joi.string().required(),
    // stock: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(5).optional(),
    tags: Joi.string().optional(),     // CSV format
    variants: Joi.string().optional()  // JSON string
});

exports.updateProductSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    description: Joi.string().allow("").optional(),
    price: Joi.number().min(1).optional(),
    discountPrice: Joi.number().min(0).optional(),
    sku: Joi.string().min(3).optional(),
    brand: Joi.string().min(2).optional(),
    category: Joi.string().optional(),
    // stock: Joi.number().min(0).optional(),
    rating: Joi.number().min(0).max(5).optional(),
    tags: Joi.string().optional(),
    variants: Joi.string().optional(),
    image: Joi.string().optional()
});
