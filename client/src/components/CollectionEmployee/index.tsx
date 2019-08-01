import * as React from 'react';
import CardEmployee from '../CardEmployee';
import { Employee } from '../../typings/api';
import { Grid } from '@material-ui/core';

interface CollectionEmployeeProps {
  employees: Employee[];
}

const CollectionEmployee: React.FunctionComponent<CollectionEmployeeProps> = props => {
  return (
    <Grid container justify="center">
      {props.employees.map((employee, i) => (
        <CardEmployee key={i} employee={employee} />
      ))}
    </Grid>
  );
};

export default CollectionEmployee;
