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

const callContents = `
  id
  duration
  timestamp
  caller
  employee
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
      transcript {
        speaker
        message
      }
    }
  }
`;

export interface GetCallVars {
  id: string;
}

export const GET_CALLS = gql`
  query CallList ($offset: Int, $limit: Int, $search: String, $status: String) {
    calls (offset: $offset, limit: $limit, search: $search, status: $status) {
      ${callContents}
    }
  }
`;

export interface GetCallsVars {
  offset?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const GET_EMPLOYEES_PAGECOUNT = gql`
  query EmployeePages($limitPerPage: Int, $search: String) {
    employeesPageCount(limitPerPage: $limitPerPage, search: $search)
  }
`;

export const GET_CALLS_PAGECOUNT = gql`
  query EmployeePages($limitPerPage: Int, $search: String, $status: String) {
    callsPageCount(limitPerPage: $limitPerPage, search: $search, status: $status)
  }
`;

export const GET_REPORTS = gql`
  query Reports {
    reports {
      resolutionRate
      callsFlagged
      avgCallLength
      numEmployees
      numCalls
    }
  }
`;
