const Joi = require("joi");

exports.addressValidation = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),

    pincode: Joi.string().pattern(/^[0-9]{6}$/).required(),
    state: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(50).required(),

    houseNo: Joi.string().min(1).max(50).required(),
    area: Joi.string().min(2).max(100).required(),
    landmark: Joi.string().allow(""),

    addressType: Joi.string().valid("Home", "Office").default("Home")
});


