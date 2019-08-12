import gql from 'graphql-tag';
import values from '../constants/values';

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

const callContents = `
  id
  duration
  timestamp
  caller
  employee
  transcript {
    speaker
    message
  }
  status
`;

export const GET_EMPLOYEES = gql`
  query EmployeeList ($offset: Int, $limit: Int, $search: String) {
    employees (offset: $offset, limit: $limit, search: $search) {
      ${employeeContents}
    }
  }
`;

export interface GetEmployeesVars {
  offset?: number;
  limit?: number;
  search?: string;
}

export const GET_EMPLOYEE = gql`
  query Employee($id: ID!) {
    employee(id: $id) {
      ${employeeContents}
      calls {
        ${callContents}
      }
    }
  }
`;

export interface GetEmployeeVars {
  id: string;
}

export const GET_CALL = gql`
  query Call($id: ID!) {
    call(id: $id) {
      ${callContents}
    }
  }
`;

export interface GetCallVars {
  id: string;
}

export const GET_CALLS = gql`
  query CallList ($offset: Int, $limit: Int, $search: String) {
    calls (offset: $offset, limit: $limit, search: $search) {
      ${callContents}
    }
  }
`;

export interface GetCallsVars {
  offset?: number;
  limit?: number;
  search?: string;
}

export const GET_EMPLOYEES_PAGECOUNT = gql`
  query EmployeePages($offset: Int, $limit: Int, $search: String) {
    employeesPageCount(limitPerPage: ${values.employeesPerPage})
  }
`;

export const GET_CALLS_PAGECOUNT = gql`
  query EmployeePages($offset: Int, $limit: Int, $search: String) {
    callsPageCount(limitPerPage: ${values.callsPerPage})
  }
`;
