// momgoas connet
const mongoose = require("mongoose");
const { MONGO_URI } = require("../configs/server.config");
const log = require("../configs/logger.config");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
require("dotenv").config();



// DATABASE CONNECTION VARIABLE
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to database succesfully seeding");
  })
  .catch((err) => console.error(err));

const seedAdmin = async (req,res) => {
  try {
    const adminCheck = await User.findOne({ email: "admin@example.com" });

    if (adminCheck) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPass = await bcrypt.hash("Admin@12345", 10);

    const adminCreated = await User.create({
      name: "Admin",
      email: "pg3131999@gmail.com",
      password: hashedPass,
    });
    res.status(201).json({msg:adminCreated,token:await adminCreated.generateToken(),userId:adminCreated._id.toString(), })
    console.log("Default admin created successfully");
    process.exit();
  } catch (error) {
    // res.status(500).json("internal server error")
    console.log("Error while seeding admin:", error);
    process.exit(1);
  }
};
 seedAdmin ();
