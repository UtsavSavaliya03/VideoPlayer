import logo from '../assets/Images/text-logo3.png';
import './Css/Header.css';
import user from '../assets/Images/user.png';
import React from 'react';
import { useHistory } from "react-router-dom";
import settingIcon from '../assets/Icons/setting.svg';
import loginIcon from '../assets/Icons/login.svg';
import addIcon from '../assets/Icons/add.svg';

export default function Header(props) {

    const history = useHistory();

    function routeChange(path) {
        history.push(path);
    }

    return (
        <div className="header-container">
            <div className="img-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="button-container">
                <ul className="navigation">
                    <li><a href="#">FAVOURITE</a></li>
                    <li><a href="#">DOWNLOADS</a></li>
                    <li>
                        <img className="img" src={user} alt="User-Img" />
                        <div className="dropdown">
                            <ul className="dropdown-content">
                                <div className="user">
                                    <div className="user-profile">
                                        <img src={user} alt="User Profile Image" />
                                    </div>
                                    <div className="user-info">
                                        <p className="user-name" >User Name</p>
                                        <p className="user-email" >Email</p>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <hr />
                                <li><button onClick={()=>routeChange('/login')} ><span><img src={loginIcon} alt="Login icon" /></span>Login</button></li>
                                <li><button onClick={()=>routeChange('/signup')} ><span><img src={addIcon} alt="Add icon" /></span>Create Account</button></li>
                                <hr />
                                <li><button><span><img src={settingIcon} alt="Setting icon" /></span>Settings</button></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="clear"></div>
        </div>
    );
}