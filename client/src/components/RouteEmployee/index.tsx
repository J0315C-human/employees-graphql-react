import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GET_EMPLOYEE, GetEmployeeVars } from '../../apollo/queries';
import { EmployeeWithCalls } from '../../typings/api';
import { Container, createStyles, makeStyles, Theme, Avatar, Typography, Card } from '@material-ui/core';
import styleProps from '../../constants/styleProps';
import EmployeeDetails from '../EmployeeDetails';
import TitleSubsection from '../TitleSubsection';
import CollectionCall from '../CollectionCall';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroContainer: {
      width: '100%',
      overflow: 'hidden',
      height: 220,
      position: 'relative',
    },
    hero: {
      width: '110%',
      height: '110%',
      position: 'absolute',
      top: '-5%',
      left: '-5%',
      opacity: 0.2,
      ...styleProps.blurredHeroImage,
    },
    headerContainer: {
      position: 'absolute',
      bottom: 0,
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
    avatar: {
      width: 150,
      height: 150,
      margin: theme.spacing(4),
      marginRight: 0,
    },
    detailsContainer: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  }),
);

const RouteEmployee: React.FunctionComponent<RouteComponentProps<{ empId: string }>> = props => {
  const id = props.match.params.empId;
  const styles = useStyles();
  return (
    <Container style={{ ...styleProps.rowWrapCentered, ...styleProps.pageScrollBox }}>
      <Query<{ employee: EmployeeWithCalls }, GetEmployeeVars> query={GET_EMPLOYEE} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>LOADING...</div>;
          }
          if (error) {
            return <div>{error}</div>;
          }
          if (data && data.employee) {
            const emp = data.employee;
            return (
              <Container style={{ marginBottom: 30 }}>
                <div className={styles.heroContainer}>
                  <div className={styles.hero} style={{ backgroundImage: `url(${emp.details.imageUrl})` }} />
                  <div className={styles.headerContainer}>
                    <Avatar alt="Employee Image" src={emp.details.imageUrl} className={styles.avatar} />
                    <Typography variant="h2" className={styles.headerName}>
                      {emp.name}
                    </Typography>
                  </div>
                </div>
                <Card className={styles.detailsContainer}>
                  <EmployeeDetails employee={emp} />
                </Card>
                <TitleSubsection>Recent Calls</TitleSubsection>
                <CollectionCall
                  calls={emp.calls}
                  animateIn
                  hideEmployeeName
                  linkPrefix={`../employees/${emp.id}/calls/`}
                />
              </Container>
            );
          } else return <div>NO DATA!</div>;
        }}
      </Query>
    </Container>
  );
};

export default RouteEmployee;
