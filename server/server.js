const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers/resolvers");
const { getUserFromToken } = require("./middleware/getUserFromToken");

const startServer = async () => {
  const app = express();
  app.use(cors());

  //setting up apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1] || "";
      console.log(token);
      try {
        const user = getUserFromToken(token);
        console.log("we are inside try");
        return { user };
      } catch (error) {
        console.log("we are inside  catch");
        console.log(token);
        console.error("Authentication error:", error.message);
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  //port started on the below port number
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
