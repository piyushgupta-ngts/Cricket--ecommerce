const { sendFail } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const Protect = require("../middlewares/auth.middleware")
const Role = require("../middlewares/role.middleware")

router.post("/add", Protect, Role("user"), async (req, res) => {
    try {
        const result = await cartController.create(req, res);
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

router.get("/cart", Protect, Role("user"), async (req, res) => {
    try {
        const result = await cartController.all(req, res);
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

router.get("/count", Protect, Role("user"), async (req, res) => {
    try {
        const result = await cartController.count(req, res);
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

router.put("/update", Protect, Role("user"), async (req, res) => {
    try {
        const result = await cartController.update(req, res);
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


router.delete("/remove", Protect, Role("user"), async (req, res) => {
    try {
        const result = await cartController.remove(req, res);
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