const { sendFail } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const Protect = require("../middlewares/auth.middleware")
const Role = require("../middlewares/role.middleware")

router.post("/cod", Protect, Role("user"), async (req, res) => {
    try {
        const result = await orderController.create(req, res);
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
router.get("/order-detail", Protect, Role("user"), async (req, res) => {
    try {
        const result = await orderController.details(req, res);
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

router.get("/invoice/:id", Protect, Role("user"), async (req, res) => {
    try {
        const result = await orderController.invoice(req, res);
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