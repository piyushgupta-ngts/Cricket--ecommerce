const categoryService = require("../services/category.service");


class CategoryController {
  async create(req, res) {
    try {
      const result = await categoryService.createCategory(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async readAll(req, res) {
    try {
      const result = await categoryService.getAllCategories(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async readOnly(req, res) {
    try {
      const result = await categoryService.getCategoryById(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(req, res) {
    try {
      const result = await categoryService.updateCategory(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(req, res) {
    try {
      const result = await categoryService.deleteCategory(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new CategoryController ()
