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

import QueryErrorLoading from '../QueryErrorLoading';
import SelectStatusFilter from '../SelectStatusFilter';

interface RouteCallsState {
  searchQuery: string;
  animateIn: boolean;
  page: number;
  statusFilter: string;
}

export default class RouteCalls extends React.Component<RouteComponentProps<{}>, RouteCallsState> {
  state = {
    searchQuery: '',
    animateIn: true,
    page: 0,
    statusFilter: 'all',
  };

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value, animateIn: false });
  };

  onChangePage = (page: { selected: number }) => {
    if (this.state.page !== page.selected) this.setState({ page: page.selected, animateIn: false });
  };

  onFilterChange = (e: React.ChangeEvent<any>) => {
    const val = (e && e.target && e.target.value) || '';
    if (this.state.statusFilter !== val) this.setState({ statusFilter: val, animateIn: false });
  };

  public render() {
    const { searchQuery, animateIn, page, statusFilter } = this.state;
    const offset = page * values.callsPerPage;
    return (
      <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
        <div style={styleProps.rowControls}>
          <SelectStatusFilter onChange={this.onFilterChange} value={statusFilter} />
          <InputSearch onChange={this.onSearchChange} />
          <PaginationWithQuery
            query={GET_CALLS_PAGECOUNT}
            search={searchQuery}
            status={statusFilter}
            resultKey="callsPageCount"
            limitPerPage={values.callsPerPage}
            onPageChange={this.onChangePage}
          />
        </div>
        <Query<{ calls: Call[] }, GetCallsVars>
          query={GET_CALLS}
          variables={{ limit: values.callsPerPage, offset, search: searchQuery, status: statusFilter }}
        >
          {({ data, loading, error }) => {
            if (data && data.calls) {
              return <CollectionCall calls={data.calls} animateIn={animateIn} linkPrefix="calls/" />;
            }
            return <QueryErrorLoading error={error} loading={loading} />;
          }}
        </Query>
      </Container>
    );
  }
}
