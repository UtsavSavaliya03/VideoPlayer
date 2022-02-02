import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Uploads from './Uploads';
import Content from './Content';
import MyChannel from './MyChannel';
import UpdateChannel from './UpdateChannel';

function Studio() {

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