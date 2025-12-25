const { sendFail } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const router = require("express").Router()
const wishlistController = require("../controllers/wishlist.controller")
const Protect = require("../middlewares/auth.middleware")
const Role = require("../middlewares/role.middleware")

router.post("/add", Protect, Role("user"), async (req, res) => {
    try {
        const result = await wishlistController.create(req, res);
        return result;
    } catch (error) {
        log.error("Internal Server Error: ", error);
        return sendFail(
            res,
            RESPONSE_MESSAGES.SERVER_ERROR,
            STATUS_CODES.SERVER_ERROR
        );
    }
})

router.get("/show", Protect, Role("user"), async (req, res) => {
    try {
        const result = await wishlistController.readAll(req, res);
        return result;
    } catch (error) {
        log.error("Internal Server Error: ", error);
        return sendFail(
            res,
            RESPONSE_MESSAGES.SERVER_ERROR,
            STATUS_CODES.SERVER_ERROR
        );
    }
})

router.delete("/remove", Protect, Role("user"), async (req, res) => {
    try {
        const result = await wishlistController.remove(req, res);
        return result;
    } catch (error) {
        log.error("Internal Server Error: ", error);
        return sendFail(
            res,
            RESPONSE_MESSAGES.SERVER_ERROR,
            STATUS_CODES.SERVER_ERROR
        );
    }
})


module.exports = router