import './Css/userHeader.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../assets/Images/text-logo3.png';
import user from '../assets/Images/user.png';
import CreateChannel from './CreateChannel';
import personIcon from '../assets/Icons/person.svg';
import channelIcon from '../assets/Icons/bubble_chart.svg';
import studioIcon from '../assets/Icons/studio.svg';
import subscribtionIcon from '../assets/Icons/subscriptions.svg';
import logOutIcon from '../assets/Icons/logout.svg';
import settingIcon from '../assets/Icons/setting.svg';


export default function UserHeader() {

    const [channelOpen, setChannelOpen] = useState(false);
    const history = useHistory();

    function routeChange(path) {
        history.push(path);
    }

    function signOutHandler() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
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
                                    <li>
                                        <button onClick={() => {routeChange('/userProfile')} } ><span><img src={personIcon} alt="person icon" /></span>My Account</button>
                                    </li>
                                    <li>
                                        <button onClick={() => { setChannelOpen(true); }}><span><img src={channelIcon} alt="Channel icon" /></span>Create Channel</button>
                                    </li>
                                    <li>
                                        <button><span><img src={studioIcon} alt="Studio icon" /></span>Studio</button>
                                    </li>
                                    <li>
                                        <button><span><img src={subscribtionIcon} alt="Subscribtion icon" /></span>Your Subscribtions</button>
                                        </li>
                                    <li>
                                        <button onClick={() => { signOutHandler() }}><span><img src={logOutIcon} alt="Log Out icon" /></span>Log Out</button>
                                    </li>
                                    <hr />
                                    <li><button><span><img src={settingIcon} alt="Setting icon" /></span>Settings</button></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="clear"></div>
            </div>
            {channelOpen && <CreateChannel setOpenChannel={setChannelOpen} />}
        </>
    )
}
