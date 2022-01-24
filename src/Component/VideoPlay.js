import React, { useState, useEffect } from 'react'
import './Css/VideoPlay.css';
import TimeAgo from 'react-timeago';
import Avatar from 'react-avatar';
import ApiCall from '../ServiceManager/apiCall';
import { useHistory, useParams } from "react-router-dom";
import { AiFillLike, AiFillHeart } from 'react-icons/ai';
import { MdWatchLater } from 'react-icons/md';
import Loader from '../ServiceManager/Loader';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../State/action-creators/index';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

function VideoPlay() {

    let history = useHistory();
    let params = useParams();

    const dispatch = useDispatch();
    const action = bindActionCreators(actionCreators, dispatch);

    const isLogin = useSelector(state => state.isLogin);
    const user = useSelector(state => state.user);


    const [userComment, setUserComment] = useState('');
    const [videoComments, setVideoComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVdListLoading, setIsVdListLoading] = useState(false);
    const [isCmtListLoading, setIsCmtListLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [previousId, setPreviousId] = useState(null);

    /* ----------- Current Playing video's Like, Favourite, Watchlater State ----------- */
    const isLiked = useSelector(state => state.isLiked);
    const isFavourite = useSelector(state => state.isFavourite);
    const isWatchLater = useSelector(state => state.isWatchLater);

    /* ----------- Current Playing video's State ----------- */
    const [playingVideo, setPlayingVideo] = useState([]);

    if (previousId != null && previousId != atob(params.id)) {
        setDataHandler();
    }

    useEffect(async () => {
        setDataHandler();
        setCommentHandler();
    }, [user]);

    async function setDataHandler() {
        /* --------------------------- Get currently playing Video ----------------------------- */

        setIsLoading(true);

        setPreviousId(atob(params.id));
        const videoId = atob(params.id);
        const url = `http://localhost:3000/getVideo/${videoId}`;
        const playingVd = await apiCall.postAPI(url);

        if (playingVd.status) {
            setPlayingVideo(playingVd.data);
            setIsLoading(false);
        }

        /* ----------- Current Playing video's Like, Favourite, Watchlater State ----------- */

        const vdParameters = {
            user_id: user._id,
            video_id: playingVd.data._id
        }

        if (isLogin) {
            // Like
            const like = await apiCall.postAPI('http://localhost:3000/checkLike', vdParameters);
            action.setLike(like.status);

            // Favourite
            const favourite = await apiCall.postAPI('http://localhost:3000/checkFavourite', vdParameters);
            action.setFavourite(favourite.status);

            // Watch Later
            const watchLater = await apiCall.postAPI('http://localhost:3000/checkWatchLater', vdParameters);
            action.setWatchLater(watchLater.status);
        }

        /* --------------------------- Get All Videos Api ----------------------------- */

        setIsVdListLoading(true);

        const videos = await apiCall.postAPI('http://localhost:3000/getAllVd');

        setIsVdListLoading(false);

        if (videos.status) {
            setVideos(videos.data);
        }
    }

    async function setCommentHandler() {
        /* --------------------------- Get Comment ----------------------------- */

        const videoId = atob(params.id);
        setIsCmtListLoading(true);

        const parameter = {
            video_id: videoId
        }

        const videoCmt = await apiCall.postAPI('http://localhost:3000/getComment', parameter);

        setIsCmtListLoading(false);
        if (videoCmt.status) {
            setVideoComments(videoCmt.data);
        }
    }

    function routeChange(path) {
        history.push(path);
    }

    function displayAlert(type, alertMsg) {
        if (type === true) {
            toast.success(alertMsg, {
                position: "top-center"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-center"
            })
        }
    }

    async function playVideo(videoId) {

        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoId
            }
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);
        }

        routeChange(`/playVideo/${btoa(videoId)}`);
        window.location.reload();
    }

    async function addLike(videoId) {
        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoId
            }
            const like = await apiCall.postAPI('http://localhost:3000/addLike', parameter);

            action.setLike(like.status);
        } else {
            displayAlert(false, "Please, Sign in first...!");
        }
    }

    async function addFavourite(videoId) {
        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoId
            }
            const favourite = await apiCall.postAPI('http://localhost:3000/addFavourite', parameter);

            action.setFavourite(favourite.status);
        } else {
            displayAlert(false, "Please, Sign in first...!");
        }
    }

    async function addWatchLater(videoId) {
        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoId
            }

            const watchLater = await apiCall.postAPI('http://localhost:3000/addWatchLater', parameter);

            action.setWatchLater(watchLater.status);
        } else {
            displayAlert(false, "Please, Sign in first...!");
        }
    }

    async function postComment() {
        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: playingVideo._id,
                cmt_text: userComment,
            }
            const comment = await apiCall.postAPI('http://localhost:3000/postComment', parameter);

            if (comment.status) {
                setUserComment('');
                setCommentHandler();
            }
        }
    }

    function renderVideosList() {
        if (isVdListLoading) {
            return (
                <>
                    <div className="container-fluid">
                        <div className="spinner">
                            <Loader />
                        </div>
                    </div>
                </>
            );
        } else {
            return videos.map(vd => {
                return (
                    <tr key={vd._id}>
                        <td className="vd-queue">
                            <button onClick={() => { playVideo(vd._id) }} >
                                <div className="vd-content-container">
                                    <div>
                                        <video className="vd-content" poster={vd.thumbnailImage_link} >
                                            <source src={vd.videoContent_link} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                                <div className="vd-info">
                                    <div className="vd-name">{vd.videoName}</div>
                                    <div className="vd-channel">{vd.channel_id.channelName}</div>
                                    <div className="vd-views-time">{<TimeAgo date={vd.createDate} />}</div>
                                </div>
                                <div className="clear"></div>
                            </button>
                        </td>
                    </tr>
                );
            })
        }
    }

    function renderComment() {
        if (videoComments.length > 0) {
            return videoComments.map((cmt) => {
                return (
                    <li key={cmt._id}>
                        <div className="user-comment">
                            <div className="row">
                                <div className="user-profile">
                                    <Avatar src={cmt.user_id.profile_picture} round size="45" name={`${cmt.user_id.fName} ${cmt.user_id.lName}`} />
                                </div>
                                <div className=" user-info col">
                                    <p className="name m-0">{`${cmt.user_id.fName} ${cmt.user_id.lName}`} • <span className="cmt-time" >{<TimeAgo date={cmt.createDate} />}</span> </p>
                                    <p className="comment m-0">{cmt.cmt_text}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            });
        } else {
            return (
                <>
                    <div className="no-comment" ><h3>No Comments</h3></div>
                </>
            )
        }
    }

    if (isLoading) {
        return (
            <>
                <div className="container-fluid">
                    <div className="spinner">
                        <div className="spinner-img">
                            <Loader />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="video-container">
                        <div className="vd-playing-cotainer">
                            <div>
                                <video className="vd-playing" poster={playingVideo.thumbnailImage_link} controls autoPlay >
                                    <source src={playingVideo.videoContent_link} type="video/mp4"></source>
                                </video>
                            </div>
                            <div className="video-details">
                                <div className="tags text-primary">
                                    {playingVideo.tags}
                                </div>
                                <div className="vd-name">
                                    <p>{playingVideo.videoName}</p>
                                </div>
                                <div className="vd-view-time">
                                    {<TimeAgo date={playingVideo.createDate} />}
                                </div>
                                <div className="btn-container">
                                    <button><AiFillLike onClick={() => addLike(playingVideo._id)} className={isLiked ? 'like-btn-active' : 'like-btn'} /><span className="tooltip-text" >Like</span></button>
                                    <button><AiFillHeart onClick={() => addFavourite(playingVideo._id)} className={isFavourite ? 'favourite-btn-active' : 'favourite-btn'} /><span className="tooltip-text" >Favourite</span></button>
                                    <button><MdWatchLater onClick={() => addWatchLater(playingVideo._id)} className={isWatchLater ? 'watch-later-btn-active' : 'watch-later-btn'} /><span className="tooltip-text" >Watch Later</span></button>
                                </div>
                                <div className="clear"></div>
                            </div><hr className="hr" />
                            <div className="channel">
                                <div className="logo">
                                    <Avatar className="channel-profile" src={playingVideo.channel_id.channel_profile} round size="50" name={playingVideo.channel_id.channelName} />
                                </div>
                                <div className="channel-info">
                                    <p className="name">{playingVideo.channel_id.channelName}</p>
                                </div>
                                <div className="clear"></div>
                            </div><hr />
                            {!isLogin &&
                                <div className="signin-btn">
                                    <h6 className="text-primary">Please, sign in to comment..
                                        <span><a href="/login" className="btn btn-outline-primary ml-4">SIGN IN</a></span></h6>
                                </div>
                            }
                            {isLogin &&
                                <div className="add-comment">
                                    <div className="user-profile">
                                        <Avatar className="user-profile-cmt" src={user.profile_picture} round size="45" name={user.fName + ' ' + user.lName} />
                                    </div>
                                    <div className="user-info">
                                        <input
                                            autoComplete="off"
                                            className="cmt-input"
                                            type="text"
                                            name="userComment"
                                            value={userComment}
                                            placeholder={`Commenting as ${user.fName} ${user.lName} `}
                                            onChange={(e) => setUserComment(e.target.value)}
                                        />
                                        {userComment.length > 0 && <button className="add-cmt-btn" onClick={() => { postComment() }} >COMMENT</button>}
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            }
                            <hr />
                            {isCmtListLoading
                                ?
                                <>
                                    <div className="comment-container">
                                        <div className="spinner">
                                            <Loader />
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="comment-container">{renderComment()}</div>
                            }
                        </div>
                        <div className="vd-list-container">
                            <div>
                                <div className='py-5 bg-light'>
                                    <h2 className='text-center'>Advertisement</h2>
                                </div>
                                <div className="vd-video">{renderVideosList()}</div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default VideoPlay;