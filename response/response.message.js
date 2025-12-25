const RESPONSE_MESSAGES = Object.freeze({
  // Authentication
  UNAUTHORIZED: "Unauthorized access",
  TOKEN_MISSING: "Authentication token missing or malformed",
  TOKEN_INVALID: "Invalid or expired token",
  TOKEN_EXPIRED: "Token has expired. Please login again.",
  TOKEN_VERIFIED: "Token verified successfully",
  USER_NOT_FOUND: "User not found",
  LOGIN_SUCCESS: "Login successful",
  SIGNUP_SUCCESS: "User registered successfully",
  WRONG_PASSWORD: "Incorrect password",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
  OTP_SENT: "OTP sent successfully",
  OTP_INVALID: "Invalid OTP",
  OTP_EXPIRED: "OTP has expired",
  ACCOUNT_NOT_VERIFIED: "Account not verified",
  PASSWORD_MISMATCH: "Passwords do not match",
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_PASSWORD_REQUIRED: "Email and password are required",
  PASSWORD_CHANGE_SUCCESS: "Password changed successfully",
  OLD_PASSWORD_INCORRECT: "Old password incorrect",
  SAME_PASSWORD_NOT_ALLOWED: "New password must be different from old password",
  VALIDATION_FAILED: "Validation failed",
  PROFILE_FETCH_SUCCESS: "Profile fetched successfully",

  //Address//
  ADDRESS_SAVE_SUCCESS: "Address added successfully",
  ADDRESS_FETCH_SUCCESS: "Addresses fetched successfully",
  ADDRESS_NOT_FOUND: "Address not found",
  ADDRESS_UPDATE_SUCCESS: "Address updated successfully",
  ADDRESS_DELETE_SUCCESS: "Address deleted successfully",

  // Cart//
  PRODUCT_NOT_FOUND: "Product not found",
  INVALID_VARIANT: "Invalid variant selected",
  ITEM_ADDED_TO_CART: "Item added to cart",
  CART_FETCH_SUCCESS: "Cart fetched successfully",
  CART_EMPTY: "Cart is empty",
  CART_COUNT_FETCH_SUCCESS: "Cart count fetched successfully",
  INVALID_QUANTITY: "Quantity cannot be negative",
  CART_NOT_FOUND: "Cart not found",
  CART_ITEM_NOT_FOUND: "Item not found in cart",
  CART_QTY_UPDATE_SUCCESS: "Cart quantity updated successfully",
  ITEM_REMOVED_FROM_CART: "Item removed from cart",

  // CATEGORY //
  CATEGORY_CREATE_SUCCESS: "Category created successfully",
  CATEGORY_ALREADY_EXISTS: "Category already exists",
  CATEGORY_FETCH_SUCCESS: "Categories fetched successfully",
  CATEGORY_NOT_FOUND: "Category not found",
  CATEGORY_UPDATE_SUCCESS: "Category updated successfully",
  CATEGORY_DELETE_SUCCESS: "Category deleted successfully",

  // Order //
  INVALID_ADDRESS: "Invalid address ID",
  CART_EMPTY: "Cart is empty",
  ORDER_PLACED_SUCCESS: "Order placed successfully",
  ORDER_FETCH_SUCCESS: "Orders fetched successfully",
  ORDER_NOT_FOUND: "Order not found",

  // Review //
  RATING_REQUIRED: "Rating is required",
  REVIEW_NOT_ALLOWED: "You can review only products you have purchased and delivered",
  ALREADY_REVIEWED: "You have already reviewed this product",
  REVIEW_ADDED_SUCCESS: "Review added successfully",
  PRODUCT_NOT_FOUND: "Product not found",
  REVIEW_FETCH_SUCCESS: "Product reviews fetched successfully",
  REVIEW_NOT_FOUND: "Review not found",
  REVIEW_UPDATE_SUCCESS: "Review updated successfully",
  REVIEW_UPDATE_NOT_ALLOWED: "You are not allowed to update this review",

  // Wishlist //
  WISHLIST_ADD_SUCCESS: "Added to wishlist",
  PRODUCT_ALREADY_IN_WISHLIST: "Product already in wishlist",
  WISHLIST_FETCH_SUCCESS: "Wishlist fetched successfully",
  WISHLIST_REMOVE_SUCCESS: "Removed from wishlist",
  WISHLIST_NOT_FOUND: "Wishlist not found",
  PRODUCT_NOT_IN_WISHLIST: "Product not found in wishlist",

  // Product //
  PRODUCT_CREATE_SUCCESS: "Product created successfully",
  INVALID_CATEGORY: "Invalid category ID",
  SKU_ALREADY_EXISTS: "SKU already exists",
  PRODUCT_FETCH_SUCCESS: "Product fetched successfully",
  PRODUCT_UPDATE_SUCCESS: "Product updated successfully",
  INVALID_VARIANTS_FORMAT: "Invalid variants JSON format",
  PRODUCT_DELETE_SUCCESS: "Product deleted successfully",

  // Variant //
  VARIANT_NOT_FOUND: "Variant not found",
  VARIANT_UPDATE_SUCCESS: "Variant updated successfully",


  // Validation
  VALIDATION_FAILED: "Validation failed",
  ALL_FIELDS_REQUIRED: "All fields are required",
  INVALID_EMAIL: "Invalid email format",
  EMAIL_REQUIRED: "Email is required",
  CONTACT_REQUIRED: "Contact number is required",
  DEVICE_ID_REQUIRED: "Device ID is required",

  // Existence
  EMAIL_EXISTS: "Email already exists",
  CONTACT_EXISTS: "Contact already exists",

  // General
  SUCCESS: "Request processed successfully",
  FAIL: "Request failed",
  SERVER_ERROR: "Internal server error",
  SOMETHING_WENT_WRONG: "Something went wrong",
  ACCESS_DENIED: "Access denied",
  FILE_UPLOAD_SUCCESS: "File uploaded successfully",
  FILE_UPLOAD_FAIL: "File upload failed",
  NOT_FOUND: "Resource not found",

  // Profile
  PROFILE_UPDATED: "Profile updated successfully",
  PROFILE_FOUND: "Profile retrieved successfully",

  // Misc
  ACTION_NOT_ALLOWED: "Action not allowed",
  TOKEN_REQUIRED: "Token is required",
});

module.exports = {
  RESPONSE_MESSAGES,
};
