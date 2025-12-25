const productService = require("../services/product.service");


class ProductController {
  async create(req, res) {
    try {
      const result = await productService.createProduct(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // async readAll(req, res) {
  //   try {
  //     const result = await productService.advancedSearch(req, res);
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  
  async readOnly(req, res) {
    try {
      const result = await productService.getProductById(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(req, res) {
    try {
      const result = await productService.updateProduct(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(req, res) {
    try {
      const result = await productService.deleteProduct(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateV(req, res) {
    try {
      const result = await productService.updateProductVariant(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }


  

}

module.exports = new ProductController ()
