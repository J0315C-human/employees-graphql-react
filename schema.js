const { gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    employees: [Employee]!
  }

  type EmployeeLocation {
    street: String
    city: String
    state: String
    postcode: String
  }

  type EmployeeDetails {
    email: String
    phone: String
    username: String
    age: Float
  }

  type Employee {
    name: String
    location: EmployeeLocation
    details: EmployeeDetails
  }
`;

module.exports = typeDefs;