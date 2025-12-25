exports.validateCreateCategory = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push("Category name is required and must be at least 3 characters.");
  }

  return errors;
};

exports.validateUpdateCategory = (data) => {
  const errors = [];

  if (data.name && data.name.trim().length < 3) {
    errors.push("Category name must be at least 3 characters.");
  }

  return errors;
};
