import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; import './Css/Studio.css';
import { useSelector } from 'react-redux';
import Uploads from './Uploads';
import Content from './Content';
import MyChannel from './MyChannel';
import UpdateChannel from './UpdateChannel';

function Studio() {

  const userChannel = useSelector((state) => state.userChannel);

  const ChannelRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={props =>
        ({ userChannel } != '') ? (
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
        <Switch>
          <Route exact path='/studio'>
            <Content />
          </Route>
          <Route path='/studio/myChannel/:id'>
            <MyChannel />
          </Route>
          <Route path='/studio/updateChannel/:id'>
            <UpdateChannel />
          </Route>
          <Route path='/studio/upload'>
            <Uploads />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Studio;