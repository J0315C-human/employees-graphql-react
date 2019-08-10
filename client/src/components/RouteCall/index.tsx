import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GetCallVars, GET_CALL } from '../../apollo/queries';
import { Call } from '../../typings/api';
import { Container, createStyles, makeStyles, Theme, Typography, Card } from '@material-ui/core';
import styleProps from '../../constants/styleProps';
import CallDetails from '../CallDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      width: '100%',
    },
    headerName: {
      margin: theme.spacing(4),
      fontWeight: 400,
    },
    subsectionTitle: {
      width: '100%',
      margin: theme.spacing(2),
    },
    detailsContainer: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  }),
);

const RouteCall: React.FunctionComponent<RouteComponentProps<{ id: string }>> = props => {
  const id = props.match.params.id;
  const styles = useStyles();
  return (
    <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
      <Query<{ call: Call }, GetCallVars> query={GET_CALL} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>LOADING...</div>;
          }
          if (error) {
            return <div>{error}</div>;
          }
          if (data && data.call) {
            const { call } = data;
            return (
              <Container style={{ marginBottom: 30 }}>
                <div className={styles.headerContainer}>
                  <Typography variant="h3" className={styles.headerName}>
                    {`Call ${id} with ${call.caller}`}
                  </Typography>
                </div>
                <Card className={styles.detailsContainer}>
                  <CallDetails call={call} />
                </Card>
              </Container>
            );
          } else return <div>NO DATA!</div>;
        }}
      </Query>
    </Container>
  );
};

export default RouteCall;
