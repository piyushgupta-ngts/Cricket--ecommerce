const orderService = require("../services/order.service");


class OderController {  
  async create(req, res) {
    try {
      const result = await orderService.checkoutCOD(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async details(req, res) {
    try {
      const result = await orderService.getUserOrders (req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }   

   async invoice(req, res) {
    try {
      const result = await orderService.generateInvoice  (req, res);
      return result;
    } catch (error) {
      throw error;
    }
  } 




}

module.exports = new OderController ()
