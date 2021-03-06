import * as React from 'react';
import { Call } from '../../typings/api';
import Grid from '@material-ui/core/Grid';
import { useTransition, animated } from 'react-spring';
import CardCall from '../CardCall';
import transitionProps from '../../constants/transitionProps';

interface CollectionCallProps {
  calls: Call[];
  animateIn: boolean;
  hideEmployeeName?: boolean;
  linkPrefix: string;
}

const CollectionCall: React.FunctionComponent<CollectionCallProps> = props => {
  const { calls, animateIn, hideEmployeeName, linkPrefix } = props;
  const transitions = useTransition(calls, call => call.id, {
    ...transitionProps.fadeDropIn,
    trail: 50,
  });

  return (
    <Grid container justify="center">
      {animateIn
        ? transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={{ ...props, width: '100%' }}>
              <CardCall hideEmployeeName={hideEmployeeName} call={item} linkPrefix={linkPrefix} />
            </animated.div>
          ))
        : calls.map((call, i) => (
            <CardCall hideEmployeeName={hideEmployeeName} call={call} key={i} linkPrefix={linkPrefix} />
          ))}
    </Grid>
  );
};

export default CollectionCall;
