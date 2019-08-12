import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GetCallsVars, GET_CALLS, GET_CALLS_PAGECOUNT } from '../../apollo/queries';
import { Call } from '../../typings/api';
import InputSearch from '../InputSearch';
import Container from '@material-ui/core/Container';
import styleProps from '../../constants/styleProps';
import CollectionCall from '../CollectionCall';
import values from '../../constants/values';
import PaginationWithQuery from '../PaginationWithQuery';

interface RouteCallsState {
  searchQuery: string;
  animateIn: boolean;
  page: number;
}

export default class RouteCalls extends React.Component<RouteComponentProps<{}>, RouteCallsState> {
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
    const offset = page * values.callsPerPage;
    return (
      <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
        <InputSearch onChange={this.onSearchChange} />
        <Query<{ calls: Call[] }, GetCallsVars>
          query={GET_CALLS}
          variables={{ limit: values.callsPerPage, offset, search: searchQuery }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <div>LOADING...</div>;
            }
            if (error) {
              return <div>{error}</div>;
            }
            if (data && data.calls) {
              return <CollectionCall calls={data.calls} animateIn={animateIn} linkPrefix="calls/" />;
            } else return <div>NO DATA!</div>;
          }}
        </Query>
        <PaginationWithQuery
          query={GET_CALLS_PAGECOUNT}
          search={searchQuery}
          resultKey="callsPageCount"
          limitPerPage={values.callsPerPage}
          onPageChange={this.onChangePage}
        />
      </Container>
    );
  }
}
