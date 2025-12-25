exports.validateServiceData = (data, file) => {
  const errors = [];

  // NAME
  if (!data.name || data.name.trim().length < 3) {
    errors.push("Name is required and must be at least 3 characters.");
  }

  // DESCRIPTION
  if (!data.description || data.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters.");
  }

  // PRICE
  if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
    errors.push("Price must be a number.");
  }

  // STOCK
  if (data.stock === undefined || isNaN(data.stock) || Number(data.stock) < 0) {
    errors.push("Stock must be a valid non-negative number.");
  }

  // CATEGORY
  if (!data.category) {
    errors.push("Category ID is required.");
  }

  // IMAGE (multer)
  if (!file) {
    errors.push("Image is required.");
  }

  return errors;
};
