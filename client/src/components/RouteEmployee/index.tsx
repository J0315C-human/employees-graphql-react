import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GET_EMPLOYEE } from '../../apollo/queries';
import { Employee } from '../../typings/api';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    hero: {
      width: '100%',
      height: '20vh',
      objectFit: 'cover',
    },
  }),
);

const RouteEmployee: React.FunctionComponent<RouteComponentProps<{ id: string }>> = props => {
  const id = props.match.params.id;
  const styles = useStyles();
  return (
    <Query<{ employee: Employee }, { id: string }> query={GET_EMPLOYEE} variables={{ id }}>
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
            <Container className={styles.container}>
              <img className={styles.hero} src={emp.details.imageUrl} />
            </Container>
          );
        } else return <div>NO DATA!</div>;
      }}
    </Query>
  );
};

export default RouteEmployee;
