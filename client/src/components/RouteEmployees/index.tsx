import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GET_EMPLOYEES, GetEmployeesVars, GET_EMPLOYEES_PAGECOUNT } from '../../apollo/queries';
import CollectionEmployee from '../CollectionEmployee';
import { Employee } from '../../typings/api';
import InputSearch from '../InputSearch';
import Container from '@material-ui/core/Container';
import styleProps from '../../constants/styleProps';
import values from '../../constants/values';
import PaginationWithQuery from '../PaginationWithQuery';
import QueryErrorLoading from '../QueryErrorLoading';

interface RouteEmployeesState {
  searchQuery: string;
  animateIn: boolean;
  page: number;
}

export default class RouteEmployees extends React.Component<RouteComponentProps<{}>, RouteEmployeesState> {
  state = {
    searchQuery: '',
    animateIn: true,
    page: 0,
  };

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value, animateIn: false });
  };

  onChangePage = (page: { selected: number }) => {
    if (this.state.page !== page.selected) this.setState({ page: page.selected, animateIn: false });
  };

  public render() {
    const { searchQuery, animateIn, page } = this.state;
    const offset = page * values.employeesPerPage;

    return (
      <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
        <div style={styleProps.rowControls}>
          <InputSearch onChange={this.onSearchChange} />
          <PaginationWithQuery
            query={GET_EMPLOYEES_PAGECOUNT}
            search={searchQuery}
            resultKey="employeesPageCount"
            limitPerPage={values.employeesPerPage}
            onPageChange={this.onChangePage}
          />
        </div>
        <Query<{ employees: Employee[] }, GetEmployeesVars>
          query={GET_EMPLOYEES}
          variables={{ limit: values.employeesPerPage, offset, search: searchQuery }}
        >
          {({ data, loading, error }) => {
            if (data && data.employees) {
              return <CollectionEmployee employees={data.employees} animateIn={animateIn} />;
            }
            return <QueryErrorLoading error={error} loading={loading} />;
          }}
        </Query>
      </Container>
    );
  }
}
