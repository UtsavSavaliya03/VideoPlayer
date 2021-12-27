import './Css/Header.css';
import React, { useState, useEffect } from 'react';
import personIcon from '../assets/Icons/person.svg';
import channelIcon from '../assets/Icons/channel.svg';
import studioIcon from '../assets/Icons/studio.svg';
import logOutIcon from '../assets/Icons/logout.svg';
import Avatar from 'react-avatar';
import { GiHamburgerMenu } from "react-icons/gi";
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

/* --------------- Icons ------------------- */

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { BiBookContent } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { GoCloudUpload } from "react-icons/go";
import { useHistory } from 'react-router-dom';

export default function Header(props) {

    const history = useHistory();

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const studioPath = (window.location.pathname);

    const [cookies, setCookie, removeCookie] = useCookies(["user", "channel"]);
    const isLogin = useSelector(state => state.isLogin);
    const user = useSelector(state => state.user);
    const userChannel = useSelector(state => state.userChannel);

    function signOutHandler() {
        removeCookie("user");
        removeCookie("channel");
        removeCookie("isLogin");
        window.location.reload();
    }

    function routeChange(path) {
        history.push(path);
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
                            {(studioPath.substr(0, 7) === '/studio') ?
                                (<>
                                    <li className='nav-text'>
                                        <a href="/">
                                            <span className="sidebar-icon" ><AiOutlineHome /></span>
                                            <span className="sidebar-title" >Home</span>
                                        </a>
                                    </li>
                                    <li className='nav-text'>
                                        <a href="/studio">
                                            <span className="sidebar-icon" ><BiBookContent /></span>
                                            <span className="sidebar-title" >Content</span>
                                        </a>
                                    </li>
                                    <li className='nav-text'>
                                        <a href={`/studio/myChannel/${btoa(userChannel._id)}`}>
                                            <span className="sidebar-icon" ><FiUser /></span>
                                            <span className="sidebar-title">My Channel</span>
                                        </a>
                                    </li>
                                    <li className='nav-text'>
                                        <a href="/studio/upload">
                                            <span className="sidebar-icon" ><GoCloudUpload /></span>
                                            <span className="sidebar-title" >Upload Video</span>
                                        </a>
                                    </li>
                                </>
                                ) : (
                                    <>
                                        <li className='nav-text'>
                                            <a href="/">
                                                <span className="sidebar-icon" ><AiOutlineHome /></span>
                                                <span className="sidebar-title" >Home</span>
                                            </a>
                                        </li>
                                        <li className='nav-text'>
                                            <a href="/likedVideos">
                                                <span className="sidebar-icon" ><BiLike /></span>
                                                <span className="sidebar-title">Liked Videos</span>
                                            </a>
                                        </li>
                                        <li className='nav-text'>
                                            <a href="/favourite">
                                                <span className="sidebar-icon" ><AiOutlineHeart /></span>
                                                <span className="sidebar-title">Favourite</span>
                                            </a>
                                        </li>
                                        <li className='nav-text'>
                                            <a href="/watchLater">
                                                <span className="sidebar-icon" ><MdOutlineWatchLater /></span>
                                                <span className="sidebar-title">Watch Latere</span>
                                            </a>
                                        </li>
                                        <li className='nav-text'>
                                            <a href="/history">
                                                <span className="sidebar-icon" ><RiHistoryLine /></span>
                                                <span className="sidebar-title">History</span>
                                            </a>
                                        </li>
                                        <li className='nav-text'>
                                            <a href="">
                                                <span className="sidebar-icon" ><FiSettings /></span>
                                                <span className="sidebar-title">Settings</span>
                                            </a>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </nav>
                </div>
                <div className="button-container">
                    <ul className="navigation">
                        {!isLogin &&
                            <li>
                                <button onClick={() => routeChange('/login')} className="btn-signin">SIGN IN</button>
                            </li>}
                        {isLogin &&
                            <li>
                                <Avatar
                                    className="header-avatar"
                                    size="35"
                                    round={true}
                                    src={user.profile_picture}
                                    name={user.fName + " " + user.lName}
                                />
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
                                        {(userChannel === 'undefined')
                                            ?
                                            <li>
                                                <a href="/createChannel" ><span><img src={channelIcon} alt="Channel icon" /></span>Create Channel</a>
                                            </li>
                                            :
                                            <li>
                                                <a target="_blank" href="/studio" ><span><img src={studioIcon} alt="Subscribtion icon" /></span>Studio</a>
                                            </li>
                                        }
                                        {(studioPath.substr(0, 7) != '/studio') &&
                                            <li>
                                                <a href="/" onClick={() => { signOutHandler() }}><span><img src={logOutIcon} alt="Log Out icon" /></span>Log Out</a>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </li>}
                    </ul>
                </div>
                <div className="clear"></div>
            </div>
        </>
    );
}