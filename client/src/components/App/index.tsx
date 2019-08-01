import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_EMPLOYEES } from '../../apollo/queries';
import CollectionEmployee from '../CollectionEmployee';
import { Employee } from '../../typings/api';

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
                  return <CollectionEmployee employees={data.employees} />;
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
