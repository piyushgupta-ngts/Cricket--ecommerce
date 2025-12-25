const Product= require("../models/product.model");
// const getNextSequenceValue = require("../utils/helpers/counter.util");
const log = require("../configs/logger.config");
// const { hashItem } = require("../utils/helpers/bcrypt.util");
class ProductDao {
  async create(id) {
    try {
      const user = await Product.findOne(category);
      if (!user) {
        return {
          message: "User not found",
          status: "failed",
          data: null,
          code: 201,
        };
      } else {
        return {
          message: "User found",
          status: "success",
          data: user,
          code: 200,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO]: ", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findOne({ userId: id });
      if (!user) {
        return {
          message: "User not found",
          status: "failed",
          data: null,
          code: 201,
        };
      } else {
        return {
          message: "User found",
          status: "success",
          data: user,
          code: 200,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO]: ", error);
      throw error;
    }
  }
}

module.exports = new ProductDao();