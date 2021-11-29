import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Component/Signup';
import Login from './Component/Login';
import SendMail from './Component/SendMail';
import ResetPassword from './Component/ResetPassword';
import Home from './Component/Home';
import VideoPlay from './Component/VideoPlay';
import UserProfile from './Component/UserProfile';
import Studio from './Component/Studio/Studio';
import homeIcon from './assets/Icons/homeBlack.svg';
import favouriteIcon from './assets/Icons/favouriteBlack.svg';
import watchLaterIcon from './assets/Icons/watchLaterBlack.svg';
import likeIcon from './assets/Icons/likeBlack.svg';
import historyIcon from './assets/Icons/historyBlack.svg';
import settingIcon from './assets/Icons/settingBlack.svg';
import Header from './Component/Header';
import Favourite from './Component/Favourite';
import WatchLater from './Component/WatchLater';
import History from './Component/History';
import Uploads from './Component/Studio/Uploads';

function App() {
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
      <Header />
      {/* <div className="side-bar">
        <ul>
            <li>
              <a href="/"><span><img src={homeIcon} alt="person icon" /></span>Home</a>
            </li>
            <li>
              <a href="/favourite"><span><img src={favouriteIcon} alt="Channel icon" /></span>Favourite</a>
            </li>
            <li>
              <a href="/watchLater"><span><img src={watchLaterIcon} alt="Subscribtion icon" /></span>Watch Later</a>
            </li>
            <li>
              <a><span><img src={likeIcon} alt="Log Out icon" /></span>Liked Videos</a>
            </li>
            <li>
              <a href="/history"><span><img src={historyIcon} alt="Subscribtion icon" /></span>History</a>
            </li>
            <hr />
            <li>
              <a><span><img src={settingIcon} alt="Setting icon" /></span>Settings</a>
            </li>
          </ul>
      </div> */}
      <div>
        <Router>
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
        </Router>
      </div>
    </>
  );
}

export default App;
