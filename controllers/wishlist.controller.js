const wishlistService = require("../services/wishlist.service");


class WishlistController {
  async create(req, res) {
    try {
      const result = await wishlistService.addToWishlist(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async readAll(req, res) {
    try {
      const result = await wishlistService.getWishlist(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  

  async remove(req, res) {
    try {
      const result = await wishlistService.removeFromWishlist(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new WishlistController ()
