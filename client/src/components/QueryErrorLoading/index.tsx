import * as React from 'react';
import { ApolloError } from 'apollo-client';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import styleProps from '../../constants/styleProps';
import CircularProgress from '@material-ui/core/CircularProgress';

interface QueryErrorLoadingProps {
  error: ApolloError | undefined;
  loading: boolean;
}

/** presents a nice loading/error component */
const QueryErrorLoading: React.FunctionComponent<QueryErrorLoadingProps> = props => {
  if (props.error) {
    return (
      <Container style={styleProps.rowWrapCentered}>
        <Typography variant="h3" style={{ color: 'red' }}>
          {'Error Fetching Data!'}
        </Typography>
      </Container>
    );
  } else if (props.loading) {
    return (
      <Container style={styleProps.rowWrapCentered}>
        <Typography variant="h5" style={{ color: 'red' }}>
          <CircularProgress style={{ marginTop: 80 }} />
        </Typography>
      </Container>
    );
  }
  return null;
};

export default QueryErrorLoading;
