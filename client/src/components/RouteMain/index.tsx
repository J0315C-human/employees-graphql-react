import React from 'react';
import { RouteComponentProps, Route } from 'react-router-dom';
import SwitchTransition from '../SwitchTransition';
import RouteEmployees from '../RouteEmployees';
import RouteEmployee from '../RouteEmployee';

const animationProps = {
  from: { opacity: 0, transform: 'translate3d(0,100px,0)' },
  enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  leave: { opacity: 0, transform: 'translate3d(0,100px,0)' },
};

class RouteMain extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <SwitchTransition location={this.props.location} animationProps={animationProps}>
        <Route path="/employees/:id" component={RouteEmployee} />
        <Route path="/employees" component={RouteEmployees} />
      </SwitchTransition>
    );
  }
}

export default RouteMain;
