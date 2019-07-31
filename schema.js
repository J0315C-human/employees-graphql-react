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
    location: EmployeeLocation
    contact: EmployeeContact
    details: EmployeeDetails
  }
`;

module.exports = typeDefs;