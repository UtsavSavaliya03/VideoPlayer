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

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';


let apiCall = new ApiCall;

function VideoPlay() {

    let history = useHistory();
    let params = useParams();

    const user = useSelector(state => state.user);
    const isLogin = useSelector(state => state.isLogin);
    const currentVd = useSelector(state => state.currentVd);

    const [userComment, setUserComment] = useState('');
    const [videoComments, setVideoComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVdListLoading, setIsVdListLoading] = useState(false);
    const [isCmtListLoading, setIsCmtListLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [previousId, setPreviousId] = useState(null);

    const [cmt, setCmt] = useState([{ "_id": "0131", "userName": "Test123", "cmt_text": "Nice content brother. Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother." }, { "_id": "0213222", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "01213", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "012135", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "015134", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "05923", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "0936", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "07", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "84608", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "09465", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "104651", "userName": "Test123", "cmt_text": "Nice content brother." }]);

    /* ----------- Current Playing video's State ----------- */
    const [playingVideo, setPlayingVideo] = useState([]);

    if (previousId != null && previousId != atob(params.id)) {
        window.location.reload();
    }

    useEffect(async () => {

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

        /* --------------------------- Get Comment Api ----------------------------- */

        setIsCmtListLoading(true);

        const parameter = {
            video_id: playingVd.data._id
        }

        const videoCmt = await apiCall.postAPI('http://localhost:3000/getComment', parameter);

        
        setIsCmtListLoading(false);
        if (videoCmt.status) {
            setVideoComments(videoCmt.data);
        }

        /* --------------------------- Get All Videos Api ----------------------------- */

        setIsVdListLoading(true);

        const videos = await apiCall.postAPI('http://localhost:3000/getAllVd');

        setIsVdListLoading(false);

        if (videos.status) {
            setVideos(videos.data);
        }

    }, [user]);

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

    async function playVideo(videoDetails) {

        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoDetails._id
            }
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);
        }

        routeChange(`/playVideo/${btoa(videoDetails._id)}`);
        window.location.reload();
    }

    async function addFavourite() {

        // const parameter = {
        //     user_id: user.user_id,
        //     video_id: video_id
        // }
        // const favourite = await apiCall.postAPI('http://localhost:3000/addFavourite', parameter);

        // displayAlert(favourite.status, favourite.msg);
    }

    async function addWatchLater() {
        if (isLogin) {
            alert("123456789")
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
                            <button onClick={() => { playVideo(vd) }} >
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
                                    <div className="vd-views-time"><span>300K</span><span> • </span><span>{<TimeAgo date={vd.createDate} />}</span></div>
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
            return cmt.map((cmt) => {
                return (
                    <tr key={cmt._id}>
                        <div className="user-comment">
                            <div className="row">
                                <div className=" user-profile">
                                    <Avatar className="user-profile-cmt" round size="45" name="Utsav Savaliy" />
                                </div>
                                <div className=" user-info">
                                    <p className="name">Utsav Savalilya • <span className="cmt-time" >3 Days ago</span> </p>
                                    <p className="comment">{cmt.cmt_text}</p>
                                </div>
                            </div>
                            {/* <div className="clear"></div> */}
                        </div>
                    </tr>
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
                                <div className="vd-name">
                                    <p>{playingVideo.videoName}</p>
                                </div>
                                <div className="vd-view-time">
                                    <span>300K</span><span> • </span><span>{<TimeAgo date={playingVideo.createDate} />}</span>
                                </div>
                                <div className="btn-container">
                                    <button><AiFillLike className="like-btn" /><span className="tooltip-text" >Like</span></button>
                                    <button><AiFillHeart onClick={() => addFavourite()} className="favourite-btn" /><span className="tooltip-text" >Favourite</span></button>
                                    <button><MdWatchLater onClick={() => addWatchLater()} className="watch-later-btn" /><span className="tooltip-text" >Watch Later</span></button>
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
                                <table>
                                    <tbody className="vd-video">{renderVideosList()}</tbody>
                                </table>
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
