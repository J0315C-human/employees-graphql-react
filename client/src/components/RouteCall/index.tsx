import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GetCallVars, GET_CALL } from '../../apollo/queries';
import { Call } from '../../typings/api';
import { Container, createStyles, makeStyles, Theme, Typography, Card } from '@material-ui/core';
import styleProps from '../../constants/styleProps';
import CallDetails from '../CallDetails';
import ButtonBack from '../ButtonBack';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const RouteCall: React.FunctionComponent<RouteComponentProps<{ callId: string; empId?: string }>> = props => {
  const { match, location } = props;
  const id = match.params.callId;
  const styles = useStyles();
  const backTo = location.pathname.includes('employees') ? `../../../employees/${match.params.empId}` : '../calls';
  return (
    <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
      <ButtonBack to={backTo} />
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
                <Typography variant="h3" className={styles.headerName} align="center">
                  {`Call ${id} with ${call.caller}`}
                </Typography>
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
