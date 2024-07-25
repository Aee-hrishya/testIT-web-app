const User = require("../../models/User");

const getDashboardResolver = async (_, __, context) => {
  try {
    if (!context.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    console.log(context.user);
    const user = await User.findById(context.user.userId);

    return {
      success: true,
      userDetails: user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { getDashboardResolver };
