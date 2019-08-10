import React from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import SwitchTransition from '../SwitchTransition';
import RouteEmployees from '../RouteEmployees';
import RouteEmployee from '../RouteEmployee';
import RouteHome from '../RouteHome';
import NavMain from '../NavMain';
import RouteCall from '../RouteCall';
import RouteCalls from '../RouteCalls';

const pageAnimationProps = {
  from: { opacity: 0, transform: 'translate3d(0,100px,0)' },
  enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  leave: { opacity: 0, transform: 'translate3d(0,100px,0)' },
};

const navAnimationProps = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  trail: 400,
};

const RouteMain: React.FunctionComponent<RouteComponentProps> = props => {
  return (
    <>
      <SwitchTransition location={props.location} animationProps={navAnimationProps}>
        <Route path="/home" render={() => null} />
        <Route path="/" component={NavMain} />
      </SwitchTransition>
      <SwitchTransition location={props.location} animationProps={pageAnimationProps}>
        <Route path="/employees/:id" component={RouteEmployee} />
        <Route path="/employees" component={RouteEmployees} />
        <Route path="/calls/:id" component={RouteCall} />
        <Route path="/calls" component={RouteCalls} />
        <Route path="/home" component={RouteHome} />
        <Redirect from="/" to="/home" />
      </SwitchTransition>
    </>
  );
};

export default RouteMain;
