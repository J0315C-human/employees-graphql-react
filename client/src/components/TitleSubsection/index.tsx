import * as React from 'react';
import { Theme, Typography, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subsectionTitle: {
      width: '100%',
      margin: theme.spacing(3),
      color: theme.palette.primary.light,
      fontWeight: 500,
    },
  }),
);

const TitleSubsection: React.FunctionComponent<{}> = props => {
  const styles = useStyles();
  return (
    <Typography className={styles.subsectionTitle} variant="h4" align="center">
      {props.children}
    </Typography>
  );
};

export default TitleSubsection;
