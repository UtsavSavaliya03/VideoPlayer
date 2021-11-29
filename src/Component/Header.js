import './Css/Header.css';
import user from '../assets/Images/user.png';
import React, { useState } from 'react';
import CreateChannel from './CreateChannel';
import settingIcon from '../assets/Icons/setting.svg';
import loginIcon from '../assets/Icons/login.svg';
import addIcon from '../assets/Icons/add.svg';
import personIcon from '../assets/Icons/person.svg';
import channelIcon from '../assets/Icons/channel.svg';
import studioIcon from '../assets/Icons/studio.svg';
import logOutIcon from '../assets/Icons/logout.svg';
import Avatar from 'react-avatar';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from './sideMenuDate';

export default function Header(props) {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [channelOpen, setChannelOpen] = useState(false);

    function signOutHandler() {
        localStorage.clear();
    }

    return (
        <>
            <div className="header-container">
                <div>
                </div>
                <div className="menu">
                    <div>
                        <a className='menu-bars'>
                            <GiHamburgerMenu onClick={showSidebar} />
                        </a>
                    </div>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <a className='menu-bars'>
                                    <AiOutlineClose />
                                </a>
                            </li>
                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <a href={item.path}>
                                            <span className="sidebar-icon" >{item.icon}</span>
                                            <span className="sidebar-title" >{item.title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <div className="button-container">
                    <ul className="navigation">
                        <li>
                            <Avatar className="header-avatar" src={user} size="35" round={true} name="Utsav Savaliya" />
                            <div className="dropdown">
                                <ul className="dropdown-content">
                                    <div className="user">
                                        <div className="user-profile">
                                            <Avatar className="dropdown-avatar" src={user} size="50" round={true} name="Utsav Savaliya" />
                                        </div>
                                        <div className="user-info">
                                            <p className="user-name" >User Name</p>
                                            <p className="user-email" >Email</p>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <hr />
                                    <li>
                                        <a href="/login" ><span><img src={loginIcon} alt="Login icon" /></span>Login</a>
                                    </li>
                                    <li>
                                        <a href="/signup" ><span><img src={addIcon} alt="Add icon" /></span>Create Account</a>
                                    </li>
                                    <li>
                                        <a href="/userProfile" ><span><img src={personIcon} alt="person icon" /></span>My Account</a>
                                    </li>
                                    <li>
                                        <button onClick={() => { setChannelOpen(true); }}><span><img src={channelIcon} alt="Channel icon" /></span>Create Channel</button>
                                    </li>
                                    <li>
                                        <a target="_blank" href="/upload" ><span><img src={studioIcon} alt="Subscribtion icon" /></span>Studio</a>
                                    </li>
                                    <li>
                                        <a href="/login" onClick={() => { signOutHandler() }}><span><img src={logOutIcon} alt="Log Out icon" /></span>Log Out</a>
                                    </li>
                                    <hr />
                                    <li>
                                        <a href="/settings"><span><img src={settingIcon} alt="Setting icon" /></span>Settings</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="clear"></div>
            </div>
            {channelOpen && <CreateChannel setOpenChannel={setChannelOpen} />}
        </>
    );
}