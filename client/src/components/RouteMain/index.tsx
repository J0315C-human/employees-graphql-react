import React from 'react';
import { RouteComponentProps, Route } from 'react-router-dom';
import SwitchTransition from '../SwitchTransition';
import RouteEmployees from '../RouteEmployees';
import RouteEmployee from '../RouteEmployee';
import RouteHome from '../RouteHome';
import NavMain from '../NavMain';
import RouteCall from '../RouteCall';
import RouteCalls from '../RouteCalls';
import transitionProps from '../../constants/transitionProps';
import { getRouteDepth } from '../../utils';
import RouteReports from '../RouteReports';

const RouteMain: React.FunctionComponent<RouteComponentProps> = props => {
  const path = props.location.pathname;
  const prevPath = (props.location && props.location.state && props.location.state['prevPath']) || path;
  const pathDepth = getRouteDepth(path);
  const prevPathDepth = getRouteDepth(prevPath);

  // set page transition based on navigation "depth".
  const pageTransition =
    pathDepth === prevPathDepth
      ? transitionProps.pageLateral
      : pathDepth > prevPathDepth
      ? transitionProps.pageDeeper
      : transitionProps.pageShallower;
  return (
    <>
      <SwitchTransition location={props.location} animationProps={transitionProps.navBarFade}>
        <Route exact path="/" render={() => null} />
        <Route path="/" component={NavMain} />
      </SwitchTransition>
      <SwitchTransition location={props.location} animationProps={pageTransition}>
        <Route path="/employees/:empId/calls/:callId" component={RouteCall} />
        <Route path="/employees/:empId" component={RouteEmployee} />
        <Route path="/employees" component={RouteEmployees} />
        <Route path="/calls/:callId" component={RouteCall} />
        <Route path="/calls" component={RouteCalls} />
        <Route path="/reports" component={RouteReports} />
        <Route path="/" component={RouteHome} />
      </SwitchTransition>
    </>
  );
};

export default RouteMain;
