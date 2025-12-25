const AuthRouter = require("./auth.routes");
const categoryRouter = require("./category.route")
const productRouter = require("./product.route")
// const categoryAdminRouter = require("./categoryAdmin.route")
const AAuthRouter = require("./auth.routes")
const CartRouter = require("./cart.routes")
const WishlistRouter = require("./wishlist.route")
const AddressRouter = require("./address.routes")
const OrderRouter = require("./order.routes")
const ReviewRouter = require("./review.route")


module.exports = {
  AuthRouter,

 
//cart
CartRouter,

//WishlistRouter
WishlistRouter,

//auth
AAuthRouter,

//category
categoryRouter,

//product
productRouter,

//address
AddressRouter,

//OrderRouter
OrderRouter,

//ReviewRouter
ReviewRouter

};
