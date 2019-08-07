import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { GET_EMPLOYEE, GetEmployeeVars } from '../../apollo/queries';
import { Employee } from '../../typings/api';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import styleProps from '../../constants/styleProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: { width: '100vw' },
    heroContainer: {
      width: '100%',
      overflow: 'hidden',
      height: '200px',
      position: 'relative',
    },
    hero: {
      width: '110%',
      height: '110%',
      position: 'absolute',
      top: '-5%',
      left: '-5%',
      opacity: 0.4,
      ...styleProps.blurredHeroImage,
    },
  }),
);

const RouteEmployee: React.FunctionComponent<RouteComponentProps<{ id: string }>> = props => {
  const id = props.match.params.id;
  const styles = useStyles();
  return (
    <Query<{ employee: Employee }, GetEmployeeVars> query={GET_EMPLOYEE} variables={{ id }}>
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
              <div className={styles.heroContainer}>
                <div className={styles.hero} style={{ backgroundImage: `url(${emp.details.imageUrl})` }} />
              </div>
            </Container>
          );
        } else return <div>NO DATA!</div>;
      }}
    </Query>
  );
};

export default RouteEmployee;
