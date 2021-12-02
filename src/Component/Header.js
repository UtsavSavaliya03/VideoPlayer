import './Css/Header.css';
import React, { useState, useEffect } from 'react';
import CreateChannel from './CreateChannel';
import personIcon from '../assets/Icons/person.svg';
import channelIcon from '../assets/Icons/channel.svg';
import studioIcon from '../assets/Icons/studio.svg';
import logOutIcon from '../assets/Icons/logout.svg';
import Avatar from 'react-avatar';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from './sideMenuData';
import { StudioSidebarData } from './Studio/studioSideMenuData';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

export default function Header(props) {

    const [sidebar, setSidebar] = useState(false);
    const [channelOpen, setChannelOpen] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const studioPath = window.location.pathname;

    const [cookies, setCookie, removeCookie] = useCookies(["user", "channel"]);
    const user = useSelector(state => state.user);
    const userChannel = useSelector(state => state.userChannel);

    function signOutHandler() {
        localStorage.clear();
        removeCookie("user");
        removeCookie("channel");
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
                            {((studioPath === '/studio' || studioPath === '/studio/upload') ? StudioSidebarData : SidebarData).map((item, index) => {
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
                        {cookies.user === undefined &&
                            <li>
                                <a href='/login' className="btn btn-outline-dark">SIGN IN</a>
                            </li>}
                        {cookies.user != undefined &&
                            <li>
                                <Avatar className="header-avatar" size="35" round={true} src={user.profile_picture} name={user.fName + " " + user.lName} />
                                <div className="dropdown">
                                    <ul className="dropdown-content">
                                        <div className="user">
                                            <div className="user-profile">
                                                <Avatar className="dropdown-avatar" size="50" round={true} src={user.profile_picture} name={user.fName + " " + user.lName} />
                                            </div>
                                            <div className="user-info">
                                                <p className="user-name" >{user.userName}</p>
                                                <p className="user-email" >{user.email}</p>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <hr />
                                        <li>
                                            <a href="/userProfile" ><span><img src={personIcon} alt="person icon" /></span>My Account</a>
                                        </li>
                                        {cookies.channel === undefined &&
                                            <li>
                                                <button onClick={() => { setChannelOpen(true); }}><span><img src={channelIcon} alt="Channel icon" /></span>Create Channel</button>
                                            </li>
                                        }
                                        {cookies.channel != undefined &&
                                            <li>
                                                <a target="_blank" href="/studio" ><span><img src={studioIcon} alt="Subscribtion icon" /></span>Studio</a>
                                            </li>
                                        }
                                        <li>
                                            <a href="/" onClick={() => { signOutHandler() }}><span><img src={logOutIcon} alt="Log Out icon" /></span>Log Out</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>}
                    </ul>
                </div>
                <div className="clear"></div>
            </div>
            {channelOpen && <CreateChannel setOpenChannel={setChannelOpen} />}
        </>
    );
}