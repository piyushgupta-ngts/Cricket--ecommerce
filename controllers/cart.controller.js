const cartService = require("../services/cart.service");


class CartController {
  async create(req, res) {
    try {
      const result = await cartService.addToCart(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async all(req, res) {
    try {
      const result = await cartService.getCart(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async count(req, res) {
    try {
      const result = await cartService.getCartCount(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(req, res) {
    try {
      const result = await cartService.updateCartQty(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async remove(req, res) {
    try {
      const result = await cartService.removeFromCart(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new CartController ()
