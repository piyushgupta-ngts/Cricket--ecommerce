const { sendFail } = require("../response/response")
const { RESPONSE_MESSAGES } = require("../response/response.message")
const router = require("express").Router();
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");
const Protect = require("../middlewares/auth.middleware")
const Role = require("../middlewares/role.middleware")
const validate = require("../middlewares/validate.middleware")
const {
  createProductSchema,
  updateProductSchema,
} = require("../utils/helpers/productValidation.util")



router.post("/product", upload.single("image"), Protect, Role("admin", "user"), validate(createProductSchema), async (req, res) => {
  try {
    const result = await productController.create(req, res);
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

// router.get("/product",Protect,Role("admin","user"),async (req, res) => {
//   try {
//     const result = await productController.readAll(req, res);
//     return result;
//   } catch (error) {
//     log.error("Internal Server Error: ", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });


router.get("/product/:id", Protect, Role("admin", "user"), async (req, res) => {
  try {
    const result = await productController.readOnly(req, res);
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


router.put("/product/:id", upload.single("image"), Protect, Role("admin", "user"), validate(updateProductSchema), async (req, res) => {
  try {
    const result = await productController.update(req, res);
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


router.delete("/product/:id", Protect, Role("admin", "user"), async (req, res) => {
  try {
    const result = await productController.delete(req, res);
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

router.put("/product/:id/variants/:variantId", Protect, Role("admin", "user"), async (req, res) => {
  try {
    const result = await productController.updateV(req, res);
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