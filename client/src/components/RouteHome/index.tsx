import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Fab, Container } from '@material-ui/core';
import Face from '@material-ui/icons/FaceOutlined';
import Phone from '@material-ui/icons/PhoneOutlined';
import ListAlt from '@material-ui/icons/ListAltOutlined';
import { Link } from 'react-router-dom';
import styleProps from '../../constants/styleProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: '10vh',
      width: '100vw',
      ...styleProps.rowWrapCentered,
    },
    fab: {
      margin: theme.spacing(1),
      width: '100%',
      height: '15vh',
      fontSize: '1.5rem',
    },
    icon: {
      marginRight: theme.spacing(1),
      fontSize: '3rem',
    },
    employees: {
      backgroundColor: 'blue',
    },
    link: {
      width: '60%',
      textDecoration: 'none',
    },
  }),
);

const RouteHome: React.FunctionComponent<RouteComponentProps<{}>> = props => {
  const styles = useStyles();
  return (
    <Container className={styles.container}>
      <Link to="employees" className={styles.link}>
        <Fab variant="extended" aria-label="employees" className={styles.fab} color="primary">
          <Face className={styles.icon} />
          Employees
        </Fab>
      </Link>
      <Link to="calls" className={styles.link}>
        <Fab variant="extended" aria-label="calls" className={styles.fab} color="primary">
          <Phone className={styles.icon} />
          Calls
        </Fab>
      </Link>
      <Link to="reports" className={styles.link}>
        <Fab variant="extended" aria-label="reports" className={styles.fab} color="primary">
          <ListAlt className={styles.icon} />
          Reports
        </Fab>
      </Link>
    </Container>
  );
};

export default RouteHome;
