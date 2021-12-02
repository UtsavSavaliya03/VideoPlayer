import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './State/store';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
/* -------------------- Redux ----------------------- */
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './State/action-creators/index';

ReactDOM.render(

  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store} >
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
