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

    const windowPath = (window.location.pathname);

    const [cookies, setCookie, removeCookie] = useCookies(["user", "channel"]);
    const isLogin = useSelector(state => state.isLogin);
    const user = useSelector(state => state.user);
    const userChannel = useSelector(state => state.userChannel);
    const [searchQuery, setSearchQuery] = useState('');

    function signOutHandler() {
        removeCookie("user");
        removeCookie("channel");
        removeCookie("isLogin");
        window.location.reload();
    }

    function routeChange(path) {
        history.push(path);
    }

    function searchHandler() {
        if (searchQuery.length > 0) {
            routeChange(`/result/${searchQuery}`);
        }
    }
    
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            searchHandler();
        }
    }

    return (
        <>
            <div className="header-container px-1 px-md-4">
                <div>
                </div>
                <div className="menu d-flex justify-content-between w-100">
                    <div className='d-inline'>
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
                            {(windowPath.substr(0, 7) === '/studio') ?
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
                                    </>
                                )
                            }
                        </ul>
                    </nav>
                    {(windowPath != "/login" && windowPath != "/signup" && windowPath != "/resetPassword" && windowPath != "/sendMail")
                        &&
                        <div className='search-bar d-inline align-self-center text-center w-50'>
                            <input
                                type="text"
                                class="search-input pl-3 py-1"
                                placeholder="Search. . ."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                className='btn-search py-1 px-0'
                                onClick={searchHandler}
                            >
                                <i class="far fa-search"></i>
                            </button>
                        </div>
                    }

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
                                            {(windowPath.substr(0, 7) != '/studio') &&
                                                <li>
                                                    <a href="/" onClick={() => { signOutHandler() }}><span><img src={logOutIcon} alt="Log Out icon" /></span>Log Out</a>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </li>}
                        </ul>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        </>
    );
}