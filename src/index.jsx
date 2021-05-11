import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import Login from './components/Login/Login';
import { ThemeProvider } from '@material-ui/core/styles'
import mondoTheme from './styles/mondoTheme'
import PageHandler from './components/Main/PageHandler'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mondoTheme}>
      {/* <Login /> */}
      <PageHandler />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
