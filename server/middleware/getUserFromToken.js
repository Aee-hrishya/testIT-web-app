const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const getUserFromToken = (token) => {
  if (!token) {
    throw new Error("No Token Provided");
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired. Please login again.");
    } else {
      throw new Error("Invalid token");
    }
  }
};

module.exports = { getUserFromToken };
