import React, { useEffect, useState } from 'react';
import './Css/WatchLater.css';
import VideoPlayer from 'react-video-js-player';
import TimeAgo from 'react-timeago';
import ApiCall from '../ServiceManager/apiCall';
import { useSelector } from 'react-redux';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";
import Loader from '../ServiceManager/Loader';
import { ToastContainer, toast } from 'react-toastify';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

function WatchLater(props) {

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [watchLater, setWatchLater] = useState('');

    useEffect(async () => {
        setIsLoading(true);

        const parameter = {
            user_id: user._id
        }
        const watchLater = await apiCall.postAPI('http://localhost:3000/getWatchLater', parameter);

        setIsLoading(false);

        if (watchLater.status) {
            setWatchLater(watchLater.data);
        }
    }, [user]);

    function routeChange(path) {
        props.history.push(path);
    }

    function displayAlert(type, alertMsg) {
        if (type == true) {
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
                video_id: videoDetails
            }
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);
        }

        routeChange('/playVideo');
    }

    async function removeWatchLater(videoId) {

        const parameter = {
            user_id: user._id,
            video_id: videoId
        }
        const watchLater = await apiCall.postAPI('http://localhost:3000/removeWatchLater', parameter);

        displayAlert(watchLater.status, watchLater.msg);

        if (watchLater.status) {
            window.location.reload();
        }
    }

    async function removeAllWatchLater() {

        const parameter = {
            user_id: user._id
        }
        const watchLater = await apiCall.postAPI('http://localhost:3000/removeAllWatchLater', parameter);

        displayAlert(watchLater.status, watchLater.msg);

        if (watchLater.status) {
            window.location.reload();
        }
    }

    function renderWatchLater() {
        return watchLater.map(vd => {
            return (
                <li key={vd._id}>
                    <div className="WL-vd-queue">
                        <div className="video-list">
                            <div className="WL-remove-btn">
                                <button onClick={() => removeWatchLater(vd.video_id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={() => playVideo(vd.video_id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="WL-vd-content-container">
                                <VideoPlayer className="WL-vd-content"
                                    src={vd.video_id.videoContent_link}
                                    poster={vd.video_id.thumbnailImage_link}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="WL-vd-info">
                                <div className="WL-vd-name">{vd.video_id.videoName}</div>
                                <div className="WL-vd-channel">{vd.video_id.channel_id.channelName}</div>
                                <div className="WL-vd-views-time"><span>300K</span><span> • </span><span>{<TimeAgo date={vd.video_id.createDate} />}</span></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </li>
            );
        })
    }

    if (!isLogin) {
        return (
            <>
                <div className="WL-vd-container">
                    <div className="WL-header">
                        <div className="title">Watch Later</div>
                    </div>
                    <div className="signin-btn">
                        <h6 className="text-primary">Please, sign in to see your watch later videos...
                            <span><a href="/login" className="btn btn-outline-primary ml-4">SIGN IN</a></span></h6>
                    </div>
                </div>
            </>
        );
    } else {

        if (isLoading) {
            return (
                <>
                    <div className="WL-vd-container">
                        <div className="WL-header">
                            <div className="title">Watch Later</div>
                        </div>
                        <div className="spinner">
                            <div className="spinner-img">
                                <Loader />
                            </div>
                            <div className="spinner-text"><h3>Loading...</h3></div>
                        </div>
                    </div>
                </>
            );
        } else {
            return watchLater.length > 0
                ? (
                    <>
                        <div className="WL-container">
                            <div className="WL-vd-container">
                                <div className="WL-header">
                                    <div className="title">Watch Later</div>
                                    <div className="WL-clear-btn"><button onClick={() => removeAllWatchLater()} >Remove all</button></div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <table>
                                        <tbody className="vd-video">{renderWatchLater()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                ) : (
                    <>
                        <div className="WL-vd-container">
                            <div className="WL-header">
                                <div className="title">Watch Later</div>
                            </div>
                            <div className="no-watch-later"><h3>No Watch Later</h3></div>
                        </div>
                    </>
                );
        }
    }
}

export default WatchLater;
