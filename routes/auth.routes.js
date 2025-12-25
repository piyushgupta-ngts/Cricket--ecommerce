const { sendFail } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const Protect = require("../middlewares/auth.middleware")
const Role = require("../middlewares/role.middleware")

router.post("/register", async (req, res) => {
  try {
    const result = await authController.register(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    )
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await authController.login(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    )
  }
});

router.post("/logout", async (req, res) => {
  try {
    const result = await authController.logout(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    )
  }
});

router.post("/changePassword", Protect, Role("user"), async (req, res) => {
  try {
    const result = await authController.changePassword(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    )
  }
});

router.get("/getprofile", Protect, Role("user"), async (req, res) => {
  try {
    const result = await authController.getprofile(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error: ", error);
    return sendFail(
      res,
      RESPONSE_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    )
  }
});




module.exports = router;
