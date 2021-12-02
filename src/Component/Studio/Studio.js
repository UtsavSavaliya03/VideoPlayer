import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; import './Css/Studio.css';
import Uploads from './Uploads';
import Content from './Content';

function Studio() {
    return (
        <>
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/studio' component={Content} />
                        <Route path='/studio/upload' component={Uploads} />
                    </Switch>
                </Router>
            </div>
        </>
    );
}

export default Studio;