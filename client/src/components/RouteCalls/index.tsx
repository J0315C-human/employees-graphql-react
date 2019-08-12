import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GetCallsVars, GET_CALLS } from '../../apollo/queries';
import { Call } from '../../typings/api';
import InputSearch from '../InputSearch';
import Container from '@material-ui/core/Container';
import styleProps from '../../constants/styleProps';
import CollectionCall from '../CollectionCall';

interface RouteCallsState {
  searchQuery: string;
  animateIn: boolean;
}

export default class RouteCalls extends React.Component<RouteComponentProps<{}>, RouteCallsState> {
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
      <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
        <InputSearch onChange={this.onSearchChange} />
        <Query<{ calls: Call[] }, GetCallsVars>
          query={GET_CALLS}
          variables={{ limit: 20, offset: 0, search: searchQuery }}
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
