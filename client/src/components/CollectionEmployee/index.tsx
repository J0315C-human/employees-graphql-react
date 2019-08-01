import * as React from 'react';
import CardEmployee from '../CardEmployee';
import { Employee } from '../../typings/api';

interface CollectionEmployeeProps {
  employees: Employee[];
}

const CollectionEmployee: React.FunctionComponent<CollectionEmployeeProps> = props => {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
      {props.employees.map((employee, i) => (
        <CardEmployee key={i} employee={employee} />
      ))}
    </div>
  );
};

export default CollectionEmployee;
