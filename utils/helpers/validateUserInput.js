// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strong password regex:
// Min 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

exports.validateUserInput = ({ name, email, password }) => {
  const errors = [];

  // Name Validation
  if (!name || name.trim().length < 3) {
    errors.push("Name must be at least 3 characters long");
  }

  // Email Validation
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // Password Validation
  if (!password || !passwordRegex.test(password)) {
    errors.push(
      "Password must be at least 6 characters, include uppercase, lowercase, number, and special character"
    );
  }

  return errors;
};


//  // Run validation
//             const errors = validateUserInput({ email, password });
//             if (errors.length > 0) {
//                 return res.status(400).json({ success: false, errors });
//             }

//             // Check user exists
//             const exists = await User.findOne({ email });
//             if (exists) {
//                 return res.status(400).json({ message: "Email already registered" });
//             }

//             // Create user
//             const user = await User.create({
//                 name,
//                 email,
//                 password,
//                 role: role === "admin" ? "admin" : "user",
//             });

//             const token = generateToken(user.email, user.role);

//             res.status(201).json({
//                 token,
//                 user: {
//                     id: user._id,
//                     email: user.email,
//                     role: user.role,
//                 },
//             });

//         } catch (err) {
//             console.error(err); res.status(500).json({ message: 'Server error' });
//         }