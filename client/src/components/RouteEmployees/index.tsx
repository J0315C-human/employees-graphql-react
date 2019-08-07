import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GET_EMPLOYEES, GetEmployeesVars } from '../../apollo/queries';
import CollectionEmployee from '../CollectionEmployee';
import { Employee } from '../../typings/api';

export default class RouteEmployees extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <Query<{ employees: Employee[] }, GetEmployeesVars> query={GET_EMPLOYEES} variables={{ limit: 20, offset: 0 }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>LOADING...</div>;
          }
          if (error) {
            return <div>{error}</div>;
          }
          if (data && data.employees) {
            return <CollectionEmployee employees={data.employees} />;
          } else return <div>NO DATA!</div>;
        }}
      </Query>
    );
  }
}
