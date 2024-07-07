const { createUserResolver } = require("./createUser");
const { loginUserResolver } = require("./loginUser");

const resolvers = {
  Mutation: {
    createUser: createUserResolver,
    loginUser: loginUserResolver,
  },
};

module.exports = resolvers;
