import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GET_EMPLOYEES, GetEmployeesVars } from '../../apollo/queries';
import CollectionEmployee from '../CollectionEmployee';
import { Employee } from '../../typings/api';
import InputSearch from '../InputSearch';
import { Container } from '@material-ui/core';
import styleProps from '../../constants/styleProps';

interface RouteEmployeesState {
  searchQuery: string;
  animateIn: boolean;
}

export default class RouteEmployees extends React.Component<RouteComponentProps<{}>, RouteEmployeesState> {
  state = {
    searchQuery: '',
    animateIn: true,
  };

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value, animateIn: false });
  };

  public render() {
    const { searchQuery, animateIn } = this.state;
    return (
      <Container style={{ ...styleProps.rowWrapCentered, width: '100vw' }}>
        <InputSearch onChange={this.onSearchChange} />
        <Query<{ employees: Employee[] }, GetEmployeesVars>
          query={GET_EMPLOYEES}
          variables={{ limit: 20, offset: 0, search: searchQuery }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <div>LOADING...</div>;
            }
            if (error) {
              return <div>{error}</div>;
            }
            if (data && data.employees) {
              return <CollectionEmployee employees={data.employees} animateIn={animateIn} />;
            } else return <div>NO DATA!</div>;
          }}
        </Query>
      </Container>
    );
  }
}
