import gql from 'graphql-tag';

const employeeStructure = `
name
id
location {
  street
  city
  state
  postcode
}
contact {
  phone
  email
  username
}
details {
  imageUrl
  age
}`;

export const GET_EMPLOYEES = gql`
  query EmployeeList {
    employees {
      ${employeeStructure}
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query Employee($id: ID!) {
    employee(id: $id) {
      ${employeeStructure}
    }
  }
`;
