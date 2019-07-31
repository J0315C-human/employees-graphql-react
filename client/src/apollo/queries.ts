import gql from 'graphql-tag';

export const GET_EMPLOYEES = gql`
  query employeeList {
    employees {
      name
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
      }
    }
  }
`;
