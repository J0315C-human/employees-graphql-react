import * as React from 'react';
import CustomLink from '../CustomLink';
import { IconButton, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

interface ButtonBackProps {
  to: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outer: {
      width: '100%',
      margin: theme.spacing(2),
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
    navBtn: {
      borderRadius: 10,
      marginRight: theme.spacing(1),
    },
    btnText: {
      marginLeft: theme.spacing(1),
    },
  }),
);

const ButtonBack: React.FunctionComponent<ButtonBackProps> = props => {
  const styles = useStyles();
  return (
    <CustomLink to={props.to} className={styles.outer}>
      <IconButton color="inherit" aria-label="go back" edge="start" className={styles.navBtn}>
        <ArrowBack />
        <Typography variant="h6" noWrap className={styles.btnText}>
          {'Back'}
        </Typography>
      </IconButton>
    </CustomLink>
  );
};

export default ButtonBack;
