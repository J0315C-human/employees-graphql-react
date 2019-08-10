import * as React from 'react';
import Card from '@material-ui/core/Card';
import { Call } from '../../typings/api';
import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoDetail from '../InfoDetail';
import { getDisplayDuration, getDisplayDateTime } from '../../utils';
import FlagIcon from '@material-ui/icons/OutlinedFlag';

interface CardCallProps {
  call: Call;
  hideEmployeeName?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'row nowrap',
      marginTop: theme.spacing(1),
      width: '100%',
      color: theme.palette.common.white,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    icon: {
      fontSize: 40,
      position: 'absolute',
      right: 10,
    },
  }),
);

const CardCall: React.FunctionComponent<CardCallProps> = props => {
  const styles = useStyles();
  const [raised, setRaised] = useState(false);
  const toggleRaised = () => setRaised(!raised);
  const { id, duration, timestamp, caller, employee, status } = props.call;

  const infoDetailStyle = { width: '25%' };
  const displayTime = getDisplayDateTime(timestamp);
  return (
    <Link to={`../calls/${id}`} style={{ textDecoration: 'none', width: '100%' }}>
      <Card className={styles.root} onMouseEnter={toggleRaised} onMouseLeave={toggleRaised} raised={raised}>
        <InfoDetail title="caller" value={caller} style={infoDetailStyle} />
        {!props.hideEmployeeName && <InfoDetail title="employee" value={employee} style={infoDetailStyle} />}
        <InfoDetail title="time" value={displayTime} style={infoDetailStyle} />
        <InfoDetail title="duration" value={getDisplayDuration(duration)} style={infoDetailStyle} />
        <InfoDetail title="status" value={status} style={infoDetailStyle} />
        {status === 'flagged' && <FlagIcon className={styles.icon} />}
      </Card>
    </Link>
  );
};

export default CardCall;
