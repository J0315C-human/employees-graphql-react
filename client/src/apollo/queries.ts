import gql from 'graphql-tag';

const employeeContents = `
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
  query EmployeeList ($offset: Int, $limit: Int) {
    employees (offset: $offset, limit: $limit) {
      ${employeeContents}
    }
  }
`;

export interface GetEmployeesVars {
  offset?: number;
  limit?: number;
}

export const GET_EMPLOYEE = gql`
  query Employee($id: ID!) {
    employee(id: $id) {
      ${employeeContents}
    }
  }
`;

export interface GetEmployeeVars {
  id: string;
}
