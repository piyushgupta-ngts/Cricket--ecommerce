exports.validateRegister = (data) => {
  const errors = [];

  if (
    !data.name ||
    data.name.trim().length < 3 ||
    !/^[A-Za-z\s]+$/.test(data.name)
  ) {
    errors.push(
      "Name must be at least 3 characters and contain only letters"
    );
  }
  
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push("Valid email is required.");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }

   if (!data.confirmPassword) {
        errors.push("Confirm password is required");
    }

  if (data.role && !["user", "admin"].includes(data.role)) {
    errors.push("Role must be either 'user' or 'admin'.");
  }

  return errors;
};


exports.validateLogin = (data) => {
  const errors = [];

  if (!data.email) {
    errors.push("Email is required.");
  }

  if (!data.password) {
    errors.push("Password is required.");
  }

  return errors;
};


exports.validateChangePassword = (data) => {
  const errors = [];

  if (!data.oldPassword) {
    errors.push("Old password is required.");
  }

  if (!data.newPassword || data.newPassword.length < 6) {
    errors.push("New password must be at least 6 characters.");
  }

  return errors;
};
