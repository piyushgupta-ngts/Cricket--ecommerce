const { sendFail } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const router = require("express").Router();
const reviewController = require("../controllers/review.controller");
const Protect = require("../middlewares/auth.middleware")
const Role = require("../middlewares/role.middleware")

router.post("/product", Protect, Role("user"), async (req, res) => {
    try {
        const result = await reviewController.create(req, res);
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

router.get("/product/:productId", Protect, Role("user"), async (req, res) => {
    try {
        const result = await reviewController.getall(req, res);
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

router.put("/product/:reviewId", Protect, Role("user"), async (req, res) => {
    try {
        const result = await reviewController.update(req, res);
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

router.delete("/product/:productId", Protect, Role("user"), async (req, res) => {
    try {
        const result = await reviewController.remove(req, res);
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


module.exports = router