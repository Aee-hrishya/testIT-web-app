const resolvers = {
  Mutation: {
    createUser: (_, { username, password }) => {
      console.log("hey");
    },
  },
};

module.exports = resolvers;
