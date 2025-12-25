const authService = require("../services/auth.service");


class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async login(req, res) {
    try {
      const result = await authService.login(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async logout(req, res) {
    try {
      const result = await authService.logout(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(req, res) {
    try {
      const result = await authService.changePassword(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getprofile(req, res) {
    try {
      const result = await authService.getprofile(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new AuthController ()
