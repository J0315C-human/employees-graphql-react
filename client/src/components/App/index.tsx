import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import RouteEmployees from '../RouteEmployees';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/employees/:id"
            render={(props: RouteComponentProps<{ id: string }>) => {
              const id = props.match.params.id;
              return <div>EMPLOYEE # {id}</div>;
            }}
          />
          <Route path="/employees" component={RouteEmployees} />
        </Switch>
      </Router>
    );
  }
}

export default App;
