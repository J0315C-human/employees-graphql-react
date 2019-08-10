import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import Home from '@material-ui/icons/HomeOutlined';
import Face from '@material-ui/icons/FaceOutlined';
import Phone from '@material-ui/icons/PhoneOutlined';
import ListAlt from '@material-ui/icons/ListAltOutlined';
import CustomLink from '../CustomLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBtn: {
      borderRadius: 10,
      marginRight: theme.spacing(1),
    },
    btnText: {
      marginLeft: theme.spacing(1),
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }),
);

const NavMain: React.FunctionComponent<RouteComponentProps> = props => {
  const styles = useStyles();
  const path = props.location.pathname;
  return (
    <AppBar position="fixed">
      <Toolbar>
        <CustomLink to="/" className={styles.link}>
          <IconButton color="inherit" aria-label="open home" edge="start" className={styles.navBtn}>
            <Home />
            <Typography variant="h6" noWrap className={styles.btnText}>
              {'Home'}
            </Typography>
          </IconButton>
        </CustomLink>
        <CustomLink to="/employees" className={styles.link}>
          <IconButton
            color="inherit"
            aria-label="open employees"
            edge="start"
            className={styles.navBtn}
            disabled={path.includes('/employees') && !path.includes('/employees/')}
          >
            <Face />
            <Typography variant="h6" noWrap className={styles.btnText}>
              {'Employees'}
            </Typography>
          </IconButton>
        </CustomLink>
        <CustomLink to="/calls" className={styles.link}>
          <IconButton
            color="inherit"
            aria-label="open calls"
            className={styles.navBtn}
            disabled={path.includes('/calls') && !path.includes('/calls/')}
          >
            <Phone />
            <Typography variant="h6" noWrap className={styles.btnText}>
              {'Calls'}
            </Typography>
          </IconButton>
        </CustomLink>
        <CustomLink to="/reports" className={styles.link}>
          <IconButton
            color="inherit"
            aria-label="open reports"
            edge="end"
            className={styles.navBtn}
            disabled={path.includes('/reports')}
          >
            <ListAlt />
            <Typography variant="h6" noWrap className={styles.btnText}>
              {'Reports'}
            </Typography>
          </IconButton>
        </CustomLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavMain;
