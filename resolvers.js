
// Resolvers for our queries
module.exports = {
  Query: {
    employees: (parent, args, { dataSources }) => dataSources.employeeAPI.getAllEmployees(args),
    employee: (parent, args, { dataSources }) => dataSources.employeeAPI.getEmployeeById(args),
  }
}