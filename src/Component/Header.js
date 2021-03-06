import './Css/CentralStyle.css';
import './Css/Header.css';
import React, { useEffect, useState } from 'react';
import personIcon from '../assets/Icons/person.svg';
import channelIcon from '../assets/Icons/channel.svg';
import studioIcon from '../assets/Icons/studio.svg';
import logOutIcon from '../assets/Icons/logout.svg';
import Avatar from 'react-avatar';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import ApiCall from '../ServiceManager/apiCall';
import { useHistory } from 'react-router-dom';

var apiCall = new ApiCall;

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

    useEffect(async () => {
        if (isLogin) {
            const url = `https://video-player-api-demo.herokuapp.com/getUserToken/${user._id}`;
            const token = await apiCall.postAPI(url);

            var checkedToken = (token.data).filter((currElement) => {
                return currElement == cookies.token
            });

            if (checkedToken.length == 0) {
                cookieRemover();
                window.location.reload();
            }
        }
    });

    function cookieRemover() {
        removeCookie("user");
        removeCookie("channel");
        removeCookie("isLogin");
        removeCookie("token");
    }

    async function signOutHandler() {
        cookieRemover();
        const parameter = {
            user_id: user._id,
            token: cookies.token
        }

        const logout = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/logout', parameter);

        if (logout.status) {
            window.location.reload();
        }
    }

    async function signOutAllHandler() {
        cookieRemover();
        const parameter = {
            user_id: user._id,
            logoutAll: true
        }

        const logoutAll = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/logout', parameter);

        if (logoutAll.status) {
            window.location.reload();
        }
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
                    <div className='d-inline align-self-center'>
                        <a className='menu-bars'>
                            <i onClick={showSidebar} class="btn-menu fas fa-bars"></i>
                        </a>
                    </div>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <a className='menu-bars'>
                                    <i class="btn-close fal fa-times m-1"></i>
                                </a>
                            </li>
                            {(windowPath.substr(0, 7) === '/studio') ?
                                (<>
                                    <li className='nav-text'>
                                        <button className='btn-navigation' onClick={() => routeChange('/')}>
                                            <i class="fas fa-home mr-3"></i>
                                            Home
                                        </button>
                                    </li>
                                    <li className='nav-text'>
                                        <button className='btn-navigation' onClick={() => { routeChange('/studio'); window.location.reload() }}>
                                            <i class="fas fa-photo-video mr-3"></i>
                                            Content
                                        </button>
                                    </li>
                                    <li className='nav-text'>
                                        <button className='btn-navigation' onClick={() => { routeChange(`/studio/myChannel/${btoa(userChannel._id)}`); window.location.reload() }}>
                                            <i class="fas fa-tv mr-3"></i>
                                            My Channel
                                        </button>
                                    </li>
                                    <li className='nav-text'>
                                        <button className='btn-navigation' onClick={() => { routeChange('/studio/upload'); window.location.reload() }}>
                                            <i class="fas fa-cloud-upload-alt mr-3"></i>
                                            Upload Video
                                        </button>
                                    </li>
                                </>
                                ) : (
                                    <>
                                        <li className='nav-text'>
                                            <button className='btn-navigation' onClick={() => routeChange('/')}>
                                                <i class="fas fa-home mr-3"></i>
                                                Home
                                            </button>
                                        </li>
                                        <li className='nav-text'>
                                            <button className='btn-navigation' onClick={() => routeChange('/likedVideos')}>
                                                <i class="fas fa-thumbs-up mr-3"></i>
                                                Liked Videos
                                            </button>
                                        </li>
                                        <li className='nav-text'>
                                            <button className='btn-navigation' onClick={() => routeChange('/favourite')}>
                                                <i class="fas fa-heart mr-3"></i>
                                                Favourite
                                            </button>
                                        </li>
                                        <li className='nav-text'>
                                            <button className='btn-navigation' onClick={() => routeChange('/watchLater')}>
                                                <i class="far fa-clock mr-3"></i>
                                                Watch Later
                                            </button>
                                        </li>
                                        <li className='nav-text'>
                                            <button className='btn-navigation' onClick={() => routeChange('/history')}>
                                                <i class="fas fa-history mr-3"></i>
                                                History
                                            </button>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </nav>
                    {/* --------- Search Bar --------- */}
                    {(windowPath != "/login" && windowPath != "/signup" && windowPath != "/resetPassword" && windowPath != "/sendMail")
                        &&
                        <div className='search-bar d-inline align-self-center text-center w-50 py-1'>
                            <input
                                type="text"
                                class="search-input pl-3 py-1"
                                placeholder="Search . . ."
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
                                <li className='py-1'>
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
                                            <div className="user row px-4 pt-3 pb-2">
                                                <div className="col-2">
                                                    <Avatar className="dropdown-avatar" size="50" round={true} src={user.profile_picture} name={user.fName + " " + user.lName} />
                                                </div>
                                                <div className="col-10 pl-4">
                                                    <h6 className="m-0 break-title-1" >{user.userName}</h6>
                                                    <p className="m-0 text-muted break-title-1" >{user.email}</p>
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
                                                <>
                                                    <li>
                                                        <a href="/" onClick={() => { signOutHandler() }}><span><img src={logOutIcon} alt="Log Out icon" /></span>Log Out</a>
                                                    </li>
                                                    <li>
                                                        <a href="/" onClick={() => { signOutAllHandler() }}><span><img src={logOutIcon} alt="Log Out icon" /></span>Log Out (All Devices )</a>
                                                    </li>
                                                </>
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