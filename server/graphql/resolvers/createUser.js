const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserResolver = async (_, { username, password, role }) => {
  try {
    // Validate password field
    if (!password || password.trim() === "") {
      return {
        success: false,
        error: "Password is required.",
      };
    }

    const saltRounds = 10;
    // Hash password for safety reasons
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    //generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      success: true,
      user: newUser,
      token,
    };
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error inbuild way to handle error using mongodb
      return {
        success: false,
        error: "Username already exists.",
      };
    }

    if (error.name === "ValidationError") {
      // Mongoose validation error
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { createUserResolver };
