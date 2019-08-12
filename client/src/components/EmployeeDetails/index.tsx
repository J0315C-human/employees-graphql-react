import * as React from 'react';
import { EmployeeWithCalls } from '../../typings/api';
import Grid from '@material-ui/core/Grid';
import styleProps from '../../constants/styleProps';
import CardStatistic from '../CardStatistic';
import Icon1 from '@material-ui/icons/AvTimer';
import Icon2 from '@material-ui/icons/Check';
import Icon3 from '@material-ui/icons/OutlinedFlag';
import { blue, red, green } from '@material-ui/core/colors';
import TitleSubsection from '../TitleSubsection';
import { getEmployeeStats } from './helpers';
import InfoDetail from '../InfoDetail';

interface EmployeeDetailsProps {
  employee: EmployeeWithCalls;
}

const EmployeeDetails: React.FunctionComponent<EmployeeDetailsProps> = props => {
  const { employee: emp } = props;
  const { avgCallLength, resolutionRate, flaggedCalls } = getEmployeeStats(emp);
  return (
    <div style={styleProps.rowWrapCentered}>
      <TitleSubsection>About</TitleSubsection>
      <Grid container spacing={2} justify="center">
        <InfoDetail title="location" value={emp.location.city + ', ' + emp.location.state} />
        <InfoDetail title="phone number" value={emp.contact.phone} />
        <InfoDetail title="email" value={emp.contact.email} />
        <InfoDetail title="age" value={emp.details.age} />
        <InfoDetail title="username" value={emp.contact.username} />
      </Grid>
      <TitleSubsection>Performance</TitleSubsection>
      <CardStatistic title="Avg. Call Length" value={avgCallLength} icon={Icon1} color={blue[500]} />
      <CardStatistic title="Resolution Rate" value={resolutionRate} icon={Icon2} color={green[500]} />
      <CardStatistic title="Flagged Calls" value={flaggedCalls} icon={Icon3} color={red[400]} />
    </div>
  );
};

export default EmployeeDetails;
