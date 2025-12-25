const userDao = require("../daos/user.dao");
const { compareItems, hashItem } = require("../utils/helpers/bcrypt.util");
const {
    validateRegister,
    validateLogin,
    validateChangePassword
} = require("../utils/helpers/auth.util");
require('dotenv').config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const { sendFail, sendSuccess } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const { STATUS_CODES } = require("../constants/common.constant");

class AuthService {
    async register(req, res) {
        try {
            // Validate body
            const errors = validateRegister(req.body);
            if (errors.length > 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.VALIDATION_FAILED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const { name, email, password, confirmPassword, role } = req.body;

            // Password match check
            if (password !== confirmPassword) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.PASSWORD_MISMATCH,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Check if email already exists
            const exists = await User.findOne({ email: email.toLowerCase() });
            if (exists) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.EMAIL_EXISTS,
                    STATUS_CODES.CONFLICT
                );
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const newUser = await User.create({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role: role || "user",
            });

            // Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.SIGNUP_SUCCESS,
                STATUS_CODES.CREATED,
                {
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                    },
                }
            );

        } catch (error) {
            log.error("error from [AUTH REGISTER SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

    // Login //

    async login(req, res) {
        try {
            //  Validate body
            const errors = validateLogin(req.body);
            if (errors.length > 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.VALIDATION_FAILED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const { email, password } = req.body;

            if (!email || !password) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.EMAIL_PASSWORD_REQUIRED,
                    STATUS_CODES.BAD_REQUEST
                );
            }
            //  Find user
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.USER_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            //  Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.INVALID_CREDENTIALS,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            //  Generate JWT
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            //  Success response
            return sendSuccess(
                res,
                RESPONSE_MESSAGES.LOGIN_SUCCESS,
                STATUS_CODES.SUCCESS,
                {
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                }
            );

        } catch (error) {
            log.error("error from [AUTH LOGIN SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// Logout //

    async logout(req, res) {
        try {


        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

// changePassword //

    async changePassword(req, res) {
        try {
            // Validate body
            const errors = validateChangePassword(req.body);
            if (errors.length > 0) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.VALIDATION_FAILED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            const { oldPassword, newPassword } = req.body;

            // Get user from JWT (recommended)
            const user = await User.findById(req.user.id);
            if (!user) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.USER_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Verify old password
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.OLD_PASSWORD_INCORRECT,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Prevent same password reuse (optional but good)
            const isSame = await bcrypt.compare(newPassword, user.password);
            if (isSame) {
                return sendFail(
                    res,
                    RESPONSE_MESSAGES.SAME_PASSWORD_NOT_ALLOWED,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Hash & save new password
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return sendSuccess(
                res,
                RESPONSE_MESSAGES.PASSWORD_CHANGE_SUCCESS,
                STATUS_CODES.SUCCESS
            );

        } catch (error) {
            log.error("error from [CHANGE PASSWORD SERVICE]: ", error);

            return sendFail(
                res,
                error.message || RESPONSE_MESSAGES.SERVER_ERROR,
                error.status || STATUS_CODES.SERVER_ERROR
            );
        }
    }

// get Profile //

    async getProfile(req, res) {
        try {
          // Fetch user (exclude password)
          const user = await User.findById(req.user.id).select("-password");
      
          if (!user) {
            return sendFail(
              res,
              RESPONSE_MESSAGES.USER_NOT_FOUND,
              STATUS_CODES.NOT_FOUND
            );
          }
      
          // Get default address
          const defaultAddress =
            user.addresses.find((addr) => addr.isDefault) || null;
      
          // Success response
          return sendSuccess(
            res,
            RESPONSE_MESSAGES.PROFILE_FETCH_SUCCESS,
            STATUS_CODES.SUCCESS,
            {
              user: {
                id: user._id,
                email: user.email,
                role: user.role,
                addresses: user.addresses,
                defaultAddress,
              },
            }
          );
      
        } catch (error) {
          log.error("error from [PROFILE SERVICE]: ", error);
      
          return sendFail(
            res,
            error.message || RESPONSE_MESSAGES.SERVER_ERROR,
            error.status || STATUS_CODES.SERVER_ERROR
          );
        }
      }
      
}

module.exports = new AuthService();