import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Component/Signup';
import Login from './Component/Login';
import SendMail from './Component/SendMail';
import ResetPassword from './Component/ResetPassword';
import Home from './Component/Home';
import VideoPlay from './Component/VideoPlay';
import UserProfile from './Component/UserProfile';
import Studio from './Component/Studio/Studio';
import Header from './Component/Header';
import Favourite from './Component/Favourite';
import WatchLater from './Component/WatchLater';
import History from './Component/History';
import Uploads from './Component/Studio/Uploads';
import { useCookies } from 'react-cookie';
/* -------------------- Redux ----------------------- */
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './State/action-creators/index';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(["user", "channel"]);
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    action.setUser((cookies.user === undefined) ? '' : cookies.user);
    action.setUserChannel((cookies.channel === undefined) ? '' : cookies.channel);
  }, [])


  let value = localStorage.getItem('isLogin');

  // const PublicRoute = ({ component: Component, ...props }) => (
  //   <Route
  //     {...props}
  //     render={props =>
  //       (value == null) ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={{ pathname: '/home' }} />
  //       )
  //     }
  //   />
  // );

  // const PrivateRoute = ({ component: Component, ...props }) => (
  //   <Route
  //     {...props}
  //     render={props =>
  //       (value != null) ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={{ pathname: '/' }} />
  //       )
  //     }
  //   />
  // );

  return (
    <>
      <Router>
        <div>
          <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/sendMail" component={SendMail} />
              <Route path="/resetPassword" component={ResetPassword} />
              <Route path="/playVideo" component={VideoPlay} />
              <Route path="/userProfile" component={UserProfile} />
              <Route path="/studio" component={Studio} />
              <Route path="/upload" component={Uploads} />
              <Route path="/favourite" component={Favourite} />
              <Route path="/watchLater" component={WatchLater} />
              <Route path="/history" component={History} />
            </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
