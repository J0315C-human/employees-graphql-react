import * as React from 'react';
import CardEmployee from '../CardEmployee';
import { Employee } from '../../typings/api';
import { Grid } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';
import transitionProps from '../../constants/transitionProps';

interface CollectionEmployeeProps {
  employees: Employee[];
  animateIn: boolean;
}

const CollectionEmployee: React.FunctionComponent<CollectionEmployeeProps> = props => {
  const { employees, animateIn } = props;
  const transitions = useTransition(employees, employee => employee.id, {
    ...transitionProps.fadeDropIn,
    trail: 35,
  });

  return (
    <Grid container justify="center">
      {animateIn
        ? transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              <CardEmployee employee={item} />
            </animated.div>
          ))
        : employees.map((emp, i) => <CardEmployee employee={emp} key={i} />)}
    </Grid>
  );
};

export default CollectionEmployee;
