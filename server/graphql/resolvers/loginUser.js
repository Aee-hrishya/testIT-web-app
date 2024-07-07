const User = require("../../models/User");
const bcrypt = require("bcrypt");

const loginUserResolver = async (_, { username, password }) => {
  try {
    const userExists = await User.countDocuments(username);
    if (userExists === 0) {
      return {
        success: false,
        error: "User does not exist. Kindly signup.",
      };
    }

    const user = await User.findOne({ username });
    if (!user) {
      return {
        success: false,
        error: "Invalid Username.",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return {
        success: true,
        user,
        token,
      };
    } else {
      return {
        success: false,
        error: "Password is incorrect.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { loginUserResolver };
