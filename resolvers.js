
// Resolvers for our queries
module.exports = {
  Query: {
    employees: (parent, args, { dataSources }) => dataSources.employeeAPI.getAllEmployees(args),
    employeesPageCount: (parent, args, { dataSources }) => dataSources.employeeAPI.getEmployeesPageCount(args),
    employee: (parent, args, { dataSources }) => dataSources.employeeAPI.getEmployeeById(args),
    calls: (parent, args, { dataSources }) => dataSources.employeeAPI.getCalls(args),
    callsPageCount: (parent, args, { dataSources }) => dataSources.employeeAPI.getCallsPageCount(args),
    call: (parent, args, { dataSources }) => dataSources.employeeAPI.getCallById(args),
    reports: (parent, args, { dataSources }) => dataSources.employeeAPI.getReports(),
  }
}