
// Resolvers for our queries
module.exports = {
  Query: {
    employees: (parent, args, { dataSources }) => dataSources.employeeAPI.getAllEmployees(args),
    employee: (parent, args, { dataSources }) => dataSources.employeeAPI.getEmployeeById(args),
    calls: (parent, args, { dataSources }) => dataSources.employeeAPI.getCalls(args),
    call: (parent, args, { dataSources }) => dataSources.employeeAPI.getCallById(args),
  }
}