import * as React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import styleProps from '../../constants/styleProps';

interface InfoDetailProps {
  title: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outer: {
      ...styleProps.columnCentered,
      justifyContent: 'space-around',
      margin: `0px ${theme.spacing(3)}`,
      padding: theme.spacing(2),
    },
  }),
);

const InfoDetail: React.FunctionComponent<InfoDetailProps> = props => {
  const styles = useStyles();
  return (
    <div className={styles.outer} style={props.style}>
      <Typography variant="body2">{props.title}</Typography>
      <Typography variant="h6">{props.value}</Typography>
    </div>
  );
};

export default InfoDetail;
