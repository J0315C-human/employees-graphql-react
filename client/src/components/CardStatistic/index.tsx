import * as React from 'react';
import { Card, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import styleProps from '../../constants/styleProps';

interface CardStatisticProps {
  title: React.ReactNode;
  value: React.ReactNode;
  icon: React.ComponentType<SvgIconProps>;
  color: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 220,
      height: 'auto',
      color: theme.palette.primary.contrastText,
      ...styleProps.rowWrapCentered,
      justifyContent: 'space-around',
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    },
    icon: {
      fontSize: 70,
    },
    text: {
      ...styleProps.columnCentered,
      justifyContent: 'space-around',
    },
  }),
);

const CardStatistic: React.FunctionComponent<CardStatisticProps> = props => {
  const Icon = props.icon;
  const styles = useStyles();
  return (
    <Card className={styles.card} style={{ backgroundColor: props.color }}>
      <Icon className={styles.icon} />
      <div className={styles.text}>
        <Typography variant="body2">{props.title}</Typography>
        <Typography variant="h3">{props.value}</Typography>
      </div>
    </Card>
  );
};

export default CardStatistic;
