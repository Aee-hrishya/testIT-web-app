const getDashboardResolver = (_, args, context) => {
  try {
    if (!context.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { getDashboardResolver };
