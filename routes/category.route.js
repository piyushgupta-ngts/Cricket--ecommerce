const { sendFail } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const router = require("express").Router();
const categoryController = require("../controllers/category.controller");

router.post("/category", async (req, res) => {
  try {
    const result = await categoryController.create(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    );
  }
});

router.get("/category", async (req, res) => {
  try {
    const result = await categoryController.readAll(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    );
  }
});

router.get("/category", async (req, res) => {
  try {
    const result = await categoryController.readOnly(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    );
  }
});

router.put("/category", async (req, res) => {
  try {
    const result = await categoryController.update(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    );
  }
});

router.delete("/category", async (req, res) => {
  try {
    const result = await categoryController.delete(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    );
  }
});

module.exports = router;