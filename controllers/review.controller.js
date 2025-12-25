const reviewService = require("../services/review.service");


class reviewController {
  async create(req, res) {
    try {
      const result = await reviewService.addReview(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getall(req, res) {
    try {
      const result = await reviewService.getProductReviews(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async update(req, res) {
    try {
      const result = await reviewService.updateReview(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async remove(req, res) {
    try {
      const result = await reviewService.deleteReview(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
  
module.exports = new reviewController ()
