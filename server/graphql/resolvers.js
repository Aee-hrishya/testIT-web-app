const { User } = require("../models/User");
const { bcrypt } = require("bcrypt");

const resolvers = {
  Mutation: {
    createUser: async (_, { username, password }) => {
      try {
        //Validate password field
        if (!password || password.trim === "") {
          return {
            success: false,
            error: "Password is required.",
          };
        }

        const saltRounds = 10;
        //hash password for safety reasons
        const hashedPassword = bcrypt.hash(password, saltRounds);
        const newUser = new User({
          username,
          password: hashedPassword,
        });

        await newUser.save();

        return {
          success: true,
          newUser,
        };
      } catch (error) {
        //we are using default mongodb error handling here as our User schema has username field set to "unique:true"
        if (error.code == 11000) {
          return {
            success: false,
            error: "Username already exists.",
          };
        }

        //We are using the default mongodb error handling here as our username field has 2 options minLength and maxLength
        if (error.name === "validationError") {
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
    },
  },
};

module.exports = resolvers;
