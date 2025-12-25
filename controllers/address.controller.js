const addressService = require("../services/address.service");


class AddressController {
  async create(req, res) {
    try {
      const result = await addressService.addAddress(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async get(req, res) {
    try {
      const result = await addressService.getAddresses(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
 
  async update(req, res) {
    try {
      const result = await addressService.updateAddress(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(req, res) {
    try {
      const result = await addressService.deleteAddress(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new AddressController ()
