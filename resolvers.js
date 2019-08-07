
// Resolvers for our queries
module.exports = {
  Query: {
    employees: (parent, args, { dataSources }) => dataSources.employeeAPI.getAllEmployees(args),
    employee: (parent, args, { dataSources }) => dataSources.employeeAPI.getEmployeeById(args),
    call: (parent, args, { dataSources }) => dataSources.employeeAPI.getCallById(args),
  }
}