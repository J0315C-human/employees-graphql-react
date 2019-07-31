
// Resolvers for our queries
module.exports = {
  Query: {
    employees: (_, __, { dataSources }) => dataSources.employeeAPI.getAllEmployees(),
  }
}