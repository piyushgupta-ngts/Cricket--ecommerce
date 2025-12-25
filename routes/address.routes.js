const {sendFail} = require("../response/response")
const{RESPONSE_MESSAGES} =require("../response/response.message")
const router = require("express").Router();
const addressController = require("../controllers/address.controller");
const Protect = require("../middlewares/auth.middleware")
const Role = require("../middlewares/role.middleware")


router.post("/address",Protect,Role("user") ,async (req, res) => { 
    try {
        const result = await addressController.create(req, res);
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

router.get("/address",Protect,Role("user"), async (req, res) => {
    try {
        const result = await addressController.get(req, res);
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

router.put("/address/:addressId",Protect,Role("user"), async (req, res) => {
    try {
        const result = await addressController.update(req, res);
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


router.delete("/address/:addressId",Protect,Role("user"), async (req, res) => {
    try {
        const result = await addressController.delete(req, res);
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