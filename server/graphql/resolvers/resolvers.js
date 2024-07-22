const { createUserResolver } = require("./createUser");
const { loginUserResolver } = require("./loginUser");
const { getDashboardResolver } = require("./dashboard");

const resolvers = {
  Mutation: {
    createUser: createUserResolver,
    loginUser: loginUserResolver,
  },
  Query: {
    dashboard: getDashboardResolver,
  },
};

module.exports = resolvers;
