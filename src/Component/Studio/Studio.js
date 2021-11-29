import React from 'react';
import { Link } from 'react-router-dom';
import './Css/Studio.css';
// import Upload from './Uploads';
// import Content from './Content';

class Studio extends React.Component {
    render() {
        return (
            <>
                <div className="side-navigation">
                    <ul className="nav-bar">
                        <li> <Link to="/">Upload here</Link> </li>
                        <li> <Link to="/content">Content</Link> </li>
                    </ul>
                </div>
                <div className="main-container">
                    {/* <Switch>
                        <Route path="/" component={Upload} />
                        <Route path="/content" component={Content} />
                        <Redirect to="/" />
                    </Switch> */}
                </div>
                <div className="clear"></div>
            </>
        );
    }
}

export default Studio;