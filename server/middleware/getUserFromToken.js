const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const getUserFromToken = (token) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    } else {
      return null;
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        error: "Token has expired kindly login again.",
      };
    } else {
      return { error: error.message };
    }
  }
};

module.exports = { getUserFromToken };
