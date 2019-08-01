import * as React from 'react';
import Card from '@material-ui/core/Card';
import { Employee } from '../../typings/api';
import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { useState } from 'react';

interface CardEmployeeProps {
  employee: Employee;
}

const useStyles = makeStyles((theme: Theme) => {
  console.log(theme.transitions.duration);
  return createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(1),
      padding: theme.spacing(0.5),
      width: 200,
      color: theme.palette.common.black,
      alignItems: 'center',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    text: {
      margin: theme.spacing(1),
      zIndex: 1,
    },
    img: {
      width: 100,
      height: 100,
      margin: theme.spacing(1),
      zIndex: 1,
      borderRadius: '50%',
      transition: 'transform 0.1s linear',
      transformOrigin: '50% 20%',
    },
    blurredBackground: {
      position: 'absolute',
      filter: 'blur(4px)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '45%',
      transition: 'opacity 0.1s linear',
    },
  });
});

const CardEmployee: React.FunctionComponent<CardEmployeeProps> = props => {
  const styles = useStyles();
  const [raised, setRaised] = useState(false);
  const toggleRaised = () => setRaised(!raised);
  const { name, id, details } = props.employee;

  return (
    <Card className={styles.root} onMouseEnter={toggleRaised} onMouseLeave={toggleRaised} raised={raised}>
      <div
        className={styles.blurredBackground}
        style={{
          backgroundImage: `url(${details.imageUrl})`,
          opacity: raised ? 0.6 : 0.3,
        }}
      ></div>
      <CardMedia
        component="img"
        src={details.imageUrl}
        className={styles.img}
        style={{ transform: raised ? 'scale(1.1)' : 'scale(1)' }}
      />
      <Typography className={styles.text}>{name}</Typography>
      <Typography className={styles.text} color="textSecondary">
        {id}
      </Typography>
    </Card>
  );
};

export default CardEmployee;
