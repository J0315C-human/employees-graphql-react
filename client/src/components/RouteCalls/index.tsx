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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface RouteCallsState {
  searchQuery: string;
  animateIn: boolean;
  page: number;
  filterType: string;
}

export default class RouteCalls extends React.Component<RouteComponentProps<{}>, RouteCallsState> {
  state = {
    searchQuery: '',
    animateIn: true,
    page: 0,
    filterType: '',
  };

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value, animateIn: false });
  };

  onChangePage = (page: { selected: number }) => {
    if (this.state.page !== page.selected) this.setState({ page: page.selected, animateIn: false });
  };

  onFilterChange = (event: React.ChangeEvent<any>) => {
    this.setState({ filterType: event.target.value });
  };

  public render() {
    const { searchQuery, animateIn, page, filterType } = this.state;
    const offset = page * values.callsPerPage;
    return (
      <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
        <div style={styleProps.rowControls}>
          <FormControl style={{ width: 170 }}>
            <InputLabel htmlFor="filter">Filter By Type</InputLabel>
            <Select value={filterType} onChange={this.onFilterChange}>
              <MenuItem value="flagged">Flagged</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="unresolved">Unresolved</MenuItem>
            </Select>
          </FormControl>
          <InputSearch onChange={this.onSearchChange} />

          <PaginationWithQuery
            query={GET_CALLS_PAGECOUNT}
            search={searchQuery}
            resultKey="callsPageCount"
            limitPerPage={values.callsPerPage}
            onPageChange={this.onChangePage}
          />
        </div>
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
      </Container>
    );
  }
}
