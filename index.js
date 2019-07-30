const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");

// Construct a schema, using GraphQL schema language
const typeDefs = `
`;

// Provide resolver functions for your schema fields
const resolvers = {
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
