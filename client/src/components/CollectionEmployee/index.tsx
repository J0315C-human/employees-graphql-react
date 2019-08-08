import * as React from 'react';
import CardEmployee from '../CardEmployee';
import { Employee } from '../../typings/api';
import { Grid } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';

interface CollectionEmployeeProps {
  employees: Employee[];
  searchQuery: string;
}

const CollectionEmployee: React.FunctionComponent<CollectionEmployeeProps> = props => {
  const { employees, searchQuery } = props;
  const transitions = useTransition(employees, employee => employee.id, {
    from: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    trail: 35,
  });

  return (
    <Grid container justify="center">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          {item.name.includes(searchQuery) ? <CardEmployee employee={item} /> : null}
        </animated.div>
      ))}
    </Grid>
  );
};

export default CollectionEmployee;
