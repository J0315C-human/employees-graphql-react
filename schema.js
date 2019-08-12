const { gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    employees(offset: Int, limit: Int, search: String): [Employee]!
    employeesPageCount(limitPerPage: Int, search: String): Int!
    employee(id: ID!): Employee
    calls(offset: Int, limit: Int, search: String, status: String): [Call]!
    callsPageCount(limitPerPage: Int, search: String, status: String): Int!
    call(id: ID!): Call
    reports: Reports
  }

  type Employee {
    name: String!
    id: ID!
    location: EmployeeLocation!
    contact: EmployeeContact!
    details: EmployeeDetails!
    calls: [Call!]!
  }

  type EmployeeLocation {
    street: String!
    city: String!
    state: String!
    postcode: String!
  }

  type EmployeeDetails {
    age: Float!
    imageUrl: String!
  }

  type EmployeeContact {
    email: String!
    phone: String!
    username: String!
  }

  type Call {
    id: ID!
    duration: Int!
    timestamp: Int!
    caller: String!
    employee: String!
    transcript: [CallTranscriptPart!]!
    status: String
  }

  type CallTranscriptPart {
    speaker: String!
    message: String!
  }

  type Reports {
    avgCallLength: Int!
    resolutionRate: Float!
    callsFlagged: Int
    numEmployees: Int
    numCalls: Int
  }
`;

module.exports = typeDefs;