import * as React from 'react';
import Card from '@material-ui/core/Card';
import { Employee } from '../../typings/api';

interface CardEmployeeProps {
  employee: Employee;
}

const CardEmployee: React.FunctionComponent<CardEmployeeProps> = props => {
  return (
    <Card style={{ display: 'flex', flexFlow: 'column nowrap', margin: 5, width: 200 }}>
      <div style={{ margin: 12 }}>{props.employee.name}</div>
      <div style={{ margin: 12 }}>{props.employee.id}</div>
      <img src={props.employee.details.imageUrl} style={{ width: 100, height: 100, margin: 12 }} />
    </Card>
  );
};

export default CardEmployee;
