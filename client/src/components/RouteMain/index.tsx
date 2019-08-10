import React from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import SwitchTransition from '../SwitchTransition';
import RouteEmployees from '../RouteEmployees';
import RouteEmployee from '../RouteEmployee';
import RouteHome from '../RouteHome';
import NavMain from '../NavMain';
import RouteCall from '../RouteCall';
import RouteCalls from '../RouteCalls';
import transitionProps from '../../constants/transitionProps';

const RouteMain: React.FunctionComponent<RouteComponentProps> = props => {
  return (
    <>
      <SwitchTransition location={props.location} animationProps={transitionProps.navBarFade}>
        <Route exact path="/" render={() => null} />
        <Route path="/" component={NavMain} />
      </SwitchTransition>
      <SwitchTransition location={props.location} animationProps={transitionProps.pageDeeper}>
        <Route path="/employees/:id" component={RouteEmployee} />
        <Route path="/employees" component={RouteEmployees} />
        <Route path="/calls/:id" component={RouteCall} />
        <Route path="/calls" component={RouteCalls} />
        <Route path="/" component={RouteHome} />
      </SwitchTransition>
    </>
  );
};

export default RouteMain;
