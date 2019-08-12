import * as React from 'react';
import { useTransition, animated } from 'react-spring';
import { Switch, RouteComponentProps } from 'react-router-dom';
import styleProps from '../../constants/styleProps';

interface SwitchTransitionProps {
  location: RouteComponentProps['location'];
  animationProps: {
    from: React.CSSProperties;
    enter: React.CSSProperties;
    leave: React.CSSProperties;
    initial?: React.CSSProperties;
    trail?: number;
  };
}

const SwitchTransition: React.FunctionComponent<SwitchTransitionProps> = props => {
  const { location, animationProps, children } = props;
  const transitions = useTransition(location, location => location.pathname, animationProps);
  return (
    <div style={styleProps.rowWrapCentered}>
      {transitions.map(({ item, props: styleProps, key }) => (
        <animated.div key={key} style={{ ...styleProps, position: 'absolute' }}>
          <Switch location={item}>{children}</Switch>
        </animated.div>
      ))}
    </div>
  );
};

export default SwitchTransition;
