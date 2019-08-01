import * as React from 'react';
import CardEmployee from '../CardEmployee';
import { Employee } from '../../typings/api';
import { Grid } from '@material-ui/core';
import { useState } from 'react';
import { useTransition, animated } from 'react-spring';

interface CollectionEmployeeProps {
  employees: Employee[];
}

const CollectionEmployee: React.FunctionComponent<CollectionEmployeeProps> = props => {
  const [items] = useState(props.employees);

  const transitions = useTransition(items, item => item.id, {
    from: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    trail: 35,
  });

  return (
    <Grid container justify="center">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <CardEmployee employee={item} />
        </animated.div>
      ))}
    </Grid>
  );
};

export default CollectionEmployee;
