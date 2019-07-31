import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_EMPLOYEES } from '../../apollo/queries';

interface Employee {
  name: string;
}

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route
          component={() => (
            <Query<{ employees: Employee[] }> query={GET_EMPLOYEES}>
              {({ data, loading, error }) => {
                if (loading) {
                  return <div>LOADING...</div>;
                }
                if (error) {
                  return <div>{error}</div>;
                }
                if (data && data.employees) {
                  return data.employees.map((employee, i) => <div key={i}>{employee.name}</div>);
                } else return <div>NO DATA!</div>;
              }}
            </Query>
          )}
        />
      </Router>
    );
  }
}

export default App;
