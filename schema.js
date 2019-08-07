const { gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    employees(offset: Int, limit: Int): [Employee]!
    employee(id: ID!): Employee
  }

  type EmployeeLocation {
    street: String
    city: String
    state: String
    postcode: String
  }

  type EmployeeDetails {
    age: Float
    imageUrl: String
  }

  type EmployeeContact {
    email: String
    phone: String
    username: String
  }

  type Employee {
    name: String
    id: ID!
    location: EmployeeLocation
    contact: EmployeeContact
    details: EmployeeDetails
  }
`;

module.exports = typeDefs;