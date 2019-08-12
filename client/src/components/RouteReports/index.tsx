import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GET_REPORTS } from '../../apollo/queries';
import { Reports } from '../../typings/api';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import styleProps from '../../constants/styleProps';
import TitleSubsection from '../TitleSubsection';
import QueryErrorLoading from '../QueryErrorLoading';
import InfoDetail from '../InfoDetail';
import CardStatistic from '../CardStatistic';
import { blue, red, green } from '@material-ui/core/colors';
import Icon1 from '@material-ui/icons/AvTimer';
import Icon2 from '@material-ui/icons/Check';
import Icon3 from '@material-ui/icons/OutlinedFlag';
import { getDisplayDuration } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailsContainer: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(4),
    },
  }),
);

const RouteReports: React.FunctionComponent<RouteComponentProps<{ empId: string }>> = props => {
  const styles = useStyles();
  return (
    <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
      <Query<{ reports: Reports }> query={GET_REPORTS}>
        {({ data, loading, error }) => {
          if (data && data.reports) {
            const reports = data.reports;
            console.log(data);
            const avgCallLength = getDisplayDuration(reports.avgCallLength);
            const resolutionRate = `${(reports.resolutionRate * 100).toFixed(1)}%`;
            return (
              <Container style={{ marginBottom: 30 }}>
                <Card className={styles.detailsContainer}>
                  <TitleSubsection>About Call Center</TitleSubsection>
                  <Grid container spacing={2} justify="center">
                    <InfoDetail title="no. employees" value={reports.numEmployees} />
                    <InfoDetail title="no. calls taken" value={reports.numCalls} />
                    <TitleSubsection>Call Center Performance</TitleSubsection>
                    <CardStatistic title="Avg. Call Length" value={avgCallLength} icon={Icon1} color={blue[500]} />
                    <CardStatistic title="Resolution Rate" value={resolutionRate} icon={Icon2} color={green[500]} />
                    <CardStatistic title="Flagged Calls" value={reports.callsFlagged} icon={Icon3} color={red[400]} />
                  </Grid>
                </Card>
              </Container>
            );
          } else return <QueryErrorLoading error={error} loading={loading} />;
        }}
      </Query>
    </Container>
  );
};

export default RouteReports;
