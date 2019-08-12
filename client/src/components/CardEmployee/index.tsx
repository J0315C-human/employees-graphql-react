import * as React from 'react';
import Card from '@material-ui/core/Card';
import { Employee } from '../../typings/api';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { useState } from 'react';
import styleProps from '../../constants/styleProps';
import CustomLink from '../CustomLink';

interface CardEmployeeProps {
  employee: Employee;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(1),
      padding: theme.spacing(0.5),
      width: 200,
      height: 210,
      color: theme.palette.common.black,
      alignItems: 'center',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    link: {
      textDecoration: 'none',
    },
    text: {
      margin: theme.spacing(1),
      zIndex: 1,
    },
    img: {
      width: 100,
      height: 100,
      flexShrink: 0,
      margin: theme.spacing(1),
      zIndex: 1,
      borderRadius: '50%',
      transition: 'transform 0.1s linear',
      transformOrigin: '50% 20%',
    },
    blurredBackground: {
      position: 'absolute',
      width: '100%',
      height: '45%',
      transition: 'opacity 0.1s linear',
      ...styleProps.blurredHeroImage,
    },
  }),
);

const CardEmployee: React.FunctionComponent<CardEmployeeProps> = props => {
  const styles = useStyles();
  const [raised, setRaised] = useState(false);
  const toggleRaised = () => setRaised(!raised);
  const { name, id, details, location } = props.employee;

  return (
    <CustomLink to={`../employees/${id}`} className={styles.link}>
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
        <Typography className={styles.text} align="center">
          {name}
        </Typography>
        <Typography className={styles.text} color="textSecondary" align="center">
          {location.city + ', ' + location.state}
        </Typography>
      </Card>
    </CustomLink>
  );
};

export default CardEmployee;
