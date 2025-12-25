// const userDao = require("../daos/user.dao");
const log = require("../configs/logger.config");
const { addressValidation } = require("../utils/helpers/address.validation.util");
const User = require("../models/user.model")
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");

class AddressService {
    async addAddress(req, res) {
        try {
            // Validate request body //
            const { error } = addressValidation.validate(req.body);
            if (error) {
                return sendFail(
                    res,
                    error.details[0].message,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Fetch user//
            const user = await User.findById(req.user.id);
            if (!user) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.USER_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Add address//
            user.addresses.push(req.body);
            await user.save();

            // Success response //
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.ADDRESS_SAVE_SUCCESS,
                STATUS_CODES.SUCCESS,
                {
                    addresses: user.addresses
                })

        } catch (error) {
            log.error("error from [Address Service]: ", error);
            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }

    }

    async getAddresses(req, res) {
        try {

            // Fetch user//
            const user = await User.findById(req.user.id);
            if (!user) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.USER_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Success response  //
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.ADDRESS_FETCH_SUCCESS,
                STATUS_CODES.SUCCESS,
                {
                    addresses: user.addresses,
                }
            );

        } catch (error) {
            log.error("error from [Address Service]: ", error);
            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }

    }

    async updateAddress(req, res) {
        try {
            const { addressId } = req.params;

            const { error } = addressValidation.validate(req.body);
            if (error) {
                return sendFail(
                    res,
                    error.details[0].message,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const user = await User.findById(req.user.id);
            if (!user) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.USER_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            const address = user.addresses.id(addressId);
            if (!address) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.ADDRESS_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            //Update address fields
            Object.assign(address, req.body);
            await user.save();

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.ADDRESS_UPDATE_SUCCESS,
                STATUS_CODES.SUCCESS,
                {
                    addresses: user.addresses,
                }
            );

        } catch (error) {
            log.error("error from [ADDRESS SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    async deleteAddress(req, res) {
        try {
          const { addressId } = req.params;
      
          //Find user
          const user = await User.findById(req.user.id);
          if (!user) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.USER_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Check address exists
          const address = user.addresses.id(addressId);
          if (!address) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.ADDRESS_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Remove address (Mongoose-safe way)
          address.remove();
          await user.save();
      
          // Success response
          return sendSuccess(
            res,
            RESPONSE_MESSAGES.ADDRESS_DELETE_SUCCESS,
            STATUS_CODES.SUCCESS,
            {
              addresses: user.addresses,
            }
          );
      
        } catch (error) {
          log.error("error from [ADDRESS SERVICE]: ", error);
      
          return sendFail(
            res,
            error.message || RESPONSE_MESSAGES.SERVER_ERROR,
            error.status || STATUS_CODES.SERVER_ERROR
          );
        }
      }

}

module.exports = new AddressService();