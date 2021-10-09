import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Signup from './Component/Signup';
import Login from './Component/Login';
import SendMail from './Component/SendMail';
import ResetPassword from './Component/ResetPassword';
import Home from './Component/Home';

function App() {
  let value = localStorage.getItem('isLogin');

  const PublicRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={props =>
        (value == null) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home' }} />
        )
      }
    />
  );

  const PrivateRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={props =>
        (value != null) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );

  return (
    <>
      <Router>
        <PublicRoute exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/sendMail" component={SendMail} />
        <Route path="/resetPassword" component={ResetPassword} />
      </Router>
    </>
  );
}

export default App;
