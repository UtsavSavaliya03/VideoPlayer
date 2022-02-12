import React, { useState, useEffect } from 'react'
import './Css/CentralStyle.css';
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
import Slider from "react-slick";
import millify from "millify";

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';
// Import css files Slick Slider (CSS)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    const [viewCmt, setViewCmt] = useState(false);

    /* ----------- Current Playing video's Like, Favourite, Watchlater State ----------- */
    const isLiked = useSelector(state => state.isLiked);
    const isFavourite = useSelector(state => state.isFavourite);
    const isWatchLater = useSelector(state => state.isWatchLater);

    /* ----------- Current Playing video's State ----------- */
    const [playingVideo, setPlayingVideo] = useState([]);

    const category = [{ "name": "Art" }, { "name": "Business" }, { "name": "Crypto" }, { "name": "Education" }, { "name": "Entertainment" }, { "name": "God" }, { "name": "Health" }, { "name": "Motivation" }, { "name": "Musics" }, { "name": "Others" }, { "name": "Science" }, { "name": "Share Market" }, { "name": "Yoga" }]

    var slider = {
        dots: false,
        speed: 1000,
        slidesToShow: 2,
        infinite: category.length > 1 ? true : false,
        centerMode: true,
        variableWidth: true
    };

    if (previousId != null && previousId != atob(params.id)) {
        setDataHandler();
    }

    useEffect(async () => {
        if (window.innerWidth > 990) {
            setViewCmt(true);
        }
        setDataHandler();
        setCommentHandler();
    }, [user]);

    async function setDataHandler() {
        /* --------------------------- Get currently playing Video ----------------------------- */

        setIsLoading(true);

        setPreviousId(atob(params.id));
        const videoId = atob(params.id);
        const url = `https://video-player-api-demo.herokuapp.com/getVideo/${videoId}`;
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
            const like = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/checkLike', vdParameters);
            action.setLike(like.status);

            // Favourite
            const favourite = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/checkFavourite', vdParameters);
            action.setFavourite(favourite.status);

            // Watch Later
            const watchLater = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/checkWatchLater', vdParameters);
            action.setWatchLater(watchLater.status);
        }

        /* --------------------------- Get All Videos Api ----------------------------- */

        setIsVdListLoading(true);

        const videos = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/getAllVd');

        setIsVdListLoading(false);

        if (videos.status) {
            setVideos(videos.data);
        }
    }

    async function setCategoryVideoHandler(category) {
        setIsVdListLoading(true);

        const url = `https://video-player-api-demo.herokuapp.com/categoryVd/${category}`;
        const categoryVideos = await apiCall.postAPI(url);

        setIsVdListLoading(false);

        if (categoryVideos.status) {
            setVideos(categoryVideos.data);
        }
    }

    async function setCommentHandler() {
        /* --------------------------- Get Comment ----------------------------- */

        const videoId = atob(params.id);
        setIsCmtListLoading(true);

        const parameter = {
            video_id: videoId
        }

        const videoCmt = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/getComment', parameter);

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
                position: "top-right"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-right"
            })
        }
    }

    async function viewHandler(videoId) {
        const viewUrl = `https://video-player-api-demo.herokuapp.com/addView/${videoId}`;
        const parameter = {
            user_id: user._id
        }

        await apiCall.postAPI(viewUrl, parameter);
    }


    async function playVideo(videoId) {

        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoId
            }
            const history = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/addHistory', parameter);
        }

        viewHandler(videoId);
        routeChange(`/playVideo/${btoa(videoId)}`);
        window.location.reload();
    }

    async function addLike(videoId) {
        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoId
            }
            const like = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/addLike', parameter);

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
            const favourite = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/addFavourite', parameter);

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

            const watchLater = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/addWatchLater', parameter);

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
            const comment = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/postComment', parameter);

            if (comment.status) {
                setUserComment('');
                setCommentHandler();
            }
        }
    }

    function renderCategory() {
        return category.map(category => {
            return (
                <div key={category.name}>
                    <button
                        onClick={() => setCategoryVideoHandler(category.name)}
                        className='category-btn mx-2'
                    >
                        {category.name}
                    </button>
                </div>
            )
        })
    }

    function renderTags() {
        return (playingVideo.tags).map(tag => {
            return (
                <div key={tag.index} className='d-inline'>
                    <p className='mr-3 d-inline'>{tag}</p>
                </div>
            );
        })
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
                    <div key={vd._id} className="vd-queue mb-3 mb-md-1">
                        <button className='text-left' onClick={() => { playVideo(vd._id) }} >
                            <div className="row">
                                <div className="col-12 col-md-5">
                                    <video className="vd-content" poster={vd.thumbnailImage_link} >
                                        <source src={vd.videoContent_link} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="col-12 col-md-7 pl-md-0">
                                    <div><h6 className='break-title-2 mb-1'>{vd.videoName}</h6></div>
                                    <div><p className='break-title-1 text-muted m-0'>{vd.channel_id.channelName}</p></div>
                                    <div><p className='text-muted m-0'>{(millify(vd.views.length) + (vd.views.length > 1 ? " Views" : " View")) + ' • '} <span>{<TimeAgo date={vd.createDate} />}</span> </p></div>
                                </div>
                            </div>
                        </button>
                    </div>
                );
            })
        }
    }

    function renderComment() {
        if (videoComments.length > 0) {
            return videoComments.map((cmt) => {
                return (
                    <li key={cmt._id}>
                        <div className="mt-4">
                            <div className="row">
                                <div className="col-1 pl-0 pr-lg-0">
                                    <Avatar src={cmt.user_id.profile_picture} round size="45" name={`${cmt.user_id.fName} ${cmt.user_id.lName}`} />
                                </div>
                                <div className="user-info col-11 pl-lg-0">
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
                    <div className='py-lg-5'><h3 className="text-center text-muted my-5">No Comments</h3></div>
                </>
            )
        }
    }

    if (isLoading) {
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
        return (
            <>
                <div className="container-fluid px-2 px-lg-5 py-4">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div>
                                <video width={'100%'} className="vd-playing" poster={playingVideo.thumbnailImage_link} autoPlay controls >
                                    <source src={playingVideo.videoContent_link} type="video/mp4"></source>
                                </video>
                            </div>
                            <div className="video-details mt-2">
                                <div className="break-title-1 text-primary">
                                    {playingVideo.tags.length > 0 && renderTags()}
                                </div>
                                <div>
                                    <h5 className='break-title-2'>{playingVideo.videoName}</h5>
                                </div>
                                <div>
                                    <h6 className='text-muted m-0'>{(millify(playingVideo.views.length) + (playingVideo.views.length > 1 ? " Views" : " View")) + ' • '} <span>{<TimeAgo date={playingVideo.createDate} />}</span> </h6>
                                </div>
                                <div className="clearfix">
                                    <div className="btn-container float-right">
                                        <button><AiFillLike onClick={() => addLike(playingVideo._id)} className={isLiked ? 'like-btn-active' : 'like-btn'} /><span className="tooltip-text" >Like</span></button>
                                        <button><AiFillHeart onClick={() => addFavourite(playingVideo._id)} className={isFavourite ? 'favourite-btn-active' : 'favourite-btn'} /><span className="tooltip-text" >Favourite</span></button>
                                        <button><MdWatchLater onClick={() => addWatchLater(playingVideo._id)} className={isWatchLater ? 'watch-later-btn-active' : 'watch-later-btn'} /><span className="tooltip-text" >Watch Later</span></button>
                                    </div>
                                </div>
                            </div><hr className="hr" />

                            {/* ------------------ Channel Information ---------------- */}
                            <div>
                                <Avatar className="channel-profile" src={playingVideo.channel_id.channel_profile} round size="50" name={playingVideo.channel_id.channelName} />
                                <h5 className="d-inline ml-3 break-title-1">{playingVideo.channel_id.channelName}</h5>
                            </div><hr />

                            {/* ------------------ Comment Section ---------------- */}
                            {!isLogin &&
                                <div className="signin-btn">
                                    <h6 className="text-primary">Please, sign in to comment..
                                        <span><a href="/login" className="btn btn-outline-primary ml-4">SIGN IN</a></span></h6>
                                </div>
                            }
                            {isLogin &&
                                <div className="add-comment row">
                                    <div className="col-1 pr-lg-0">
                                        <Avatar className="user-profile-cmt" src={user.profile_picture} round size="45" name={user.fName + ' ' + user.lName} />
                                    </div>
                                    <div className="user-info col-11 pl-lg-0 pl-md-0 pl-4">
                                        <input
                                            autoComplete="off"
                                            className="cmt-input w-100 py-1 px-2"
                                            type="text"
                                            name="userComment"
                                            value={userComment}
                                            placeholder={`Commenting as ${user.fName} ${user.lName} `}
                                            onChange={(e) => setUserComment(e.target.value)}
                                        />
                                        {userComment.length > 0 && <button className="cmt-btn float-right" onClick={() => { postComment() }} >COMMENT</button>}
                                    </div>
                                </div>
                            }
                            <hr />
                            {
                                /* ------ Comment Buttons ------ */
                                viewCmt ? (
                                    <div className="clearfix">
                                        <button onClick={() => setViewCmt(false)} className='cmt-btn text-uppercase float-right'>Hide Comments</button>
                                    </div>
                                ) : (
                                    <div className="clearfix">
                                        <button onClick={() => setViewCmt(true)} className='cmt-btn text-uppercase float-right'>View Comments</button>
                                    </div>
                                )
                            }
                            {viewCmt &&
                                <>
                                    {isCmtListLoading ? (
                                        <>
                                            <div className="comment-container">
                                                <div className="spinner">
                                                    <Loader />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="comment-container">{renderComment()}</div>
                                        </>
                                    )
                                    }
                                </>
                            }

                        </div>
                        <div className='col-12 col-lg-4'>
                            <div>
                                <div className='py-5 bg-light mb-4'>
                                    <h2 className='text-center'>Advertisement</h2>
                                </div>
                                <div className='my-3 py-2 border-top border-bottom'>
                                    <Slider {...slider}>
                                        {renderCategory()}
                                    </Slider>
                                </div>
                                <div className="vd-video">{renderVideosList()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default VideoPlay;