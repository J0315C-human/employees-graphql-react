const { ApolloServer } = require("apollo-server");
const typeDefs = require('./schema.js');
const EmployeeAPI = require('./employeeAPI.js');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    employeeAPI: new EmployeeAPI,
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
