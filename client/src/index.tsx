import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jssPreset from '@material-ui/core/styles/jssPreset';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';

// setup for JSS to be interoperable with styled-components
const styleNode = document.createComment('insertion-point-jss');
const head = document.head;
const firstChild = head && head.firstChild;
if (document && styleNode && head && firstChild && head.insertBefore) {
  head.insertBefore(styleNode, firstChild);
}
const generateClassName = createGenerateClassName();
const jss: any = create(jssPreset());
jss.options.insertionPoint = 'insertion-point-jss';

const theme = createMuiTheme({
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <App />
    </JssProvider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();