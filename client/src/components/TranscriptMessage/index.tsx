import * as React from 'react';
import { Card, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

interface TranscriptMessageProps {
  speaker: string;
  message: string;
  isAgent: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
  const cardStyle = {
    borderRadius: 30,
    padding: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    fontSize: '1.5rem',
  };
  return createStyles({
    cardAgent: {
      ...cardStyle,
      marginRight: '10%',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      borderTopLeftRadius: 2,
    },
    cardCaller: {
      ...cardStyle,
      marginLeft: '10%',
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      borderTopRightRadius: 2,
    },
    speaker: {
      color: theme.palette.common.black,
      width: '100%',
    },
  });
});

const TranscriptMessage: React.FunctionComponent<TranscriptMessageProps> = props => {
  const styles = useStyles();
  return (
    <>
      <Typography variant="body2" className={styles.speaker} align={props.isAgent ? 'left' : 'right'}>
        {props.speaker}
      </Typography>
      <Card className={props.isAgent ? styles.cardAgent : styles.cardCaller}>
        <Typography variant="body2">{props.message}</Typography>
      </Card>
    </>
  );
};

export default TranscriptMessage;
