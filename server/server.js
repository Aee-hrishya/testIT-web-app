const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const app = express();
app.use(cors());

//setting up apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//port started on the below port number
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
