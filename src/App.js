import React, { Component, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import { useCookies } from 'react-cookie';
import CreateChannel from './Component/CreateChannel';
import LikedVd from './Component/LikedVd';
/* -------------------- Redux ----------------------- */
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './State/action-creators/index';
import SearchResult from './Component/SearchResult';

function App(props) {

  const [cookies, setCookie] = useCookies(["user", "channel", "isLogin"]);
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);
  const isLogin = cookies.isLogin === undefined ? false : cookies.isLogin;
  const userChannel = cookies.channel === undefined ? false : true;

  useEffect(() => {
    action.setUser((cookies.user === undefined) ? '' : cookies.user);
    action.setUserChannel((cookies.channel === undefined) ? '' : cookies.channel);
    action.setLogin((cookies.isLogin === undefined) ? false : cookies.isLogin);
  }, [])

  const LoginRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={props =>
        (isLogin === false) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );

  const SecureRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={props => 
        (isLogin) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: '/'}} />
        )
      }
    />
  );

  const ChannelRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={props =>
        (userChannel) ? (
          <Component {...props} />
        ) : (
          (isLogin == true) ? (
            <Redirect to={{ pathname: '/' }} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        )
      }
    />
  );

  return (
    <>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <LoginRoute path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/sendMail" component={SendMail} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/playVideo/:id" component={VideoPlay} />
            <SecureRoute path="/userProfile" component={UserProfile} />
            <SecureRoute path="/createChannel" component={CreateChannel} />
            <ChannelRoute path="/studio" component={Studio} />
            <Route path="/favourite" component={Favourite} />
            <Route path="/watchLater" component={WatchLater} />
            <Route path="/history" component={History} />
            <Route path="/likedVideos" component={LikedVd} />
            <Route path="/result/:name" component={SearchResult} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
