import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
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
      <Typography variant="body2" align="center">
        {props.title}
      </Typography>
      <Typography variant="h6" align="center">
        {props.value}
      </Typography>
    </div>
  );
};

export default InfoDetail;
