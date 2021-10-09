import './Css/userHeader.css';
import React, { useState } from 'react';
import logo from '../assets/Images/text-logo3.png';
import user from '../assets/Images/user.png';
import CreateChannel from './CreateChannel';


export default function UserHeader() {

    const [channelOpen, setChannelOpen] = useState(false);

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
                                    <li><button
                                        onClick={() => { setChannelOpen(true); }}>Create Channel</button></li>
                                    <li><button>Your Subscribtions</button></li>
                                    <li><button
                                        onClick={() => { signOutHandler() }}>Sign Out</button></li>
                                    <hr />
                                    <li><button>Settings</button></li>
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
