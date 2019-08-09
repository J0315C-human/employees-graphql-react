import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import client from './apollo/client';
import blueGrey from '@material-ui/core/colors/blueGrey';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RouteMain from './components/RouteMain';
import './global.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[600],
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router>
        <Route component={RouteMain} />
      </Router>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
