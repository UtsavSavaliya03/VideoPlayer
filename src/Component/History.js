import React, { useState, useEffect } from 'react';
import './Css/History.css';
import VideoPlayer from 'react-video-js-player';
import TimeAgo from 'react-timeago';
import ApiCall from '../ServiceManager/apiCall';
import Loader from '../ServiceManager/Loader';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall();

function History(props) {

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(async () => {

        setIsLoading(true);

        const parameter = {
            user_id: user._id
        }
        const history = await apiCall.postAPI('http://localhost:3000/getHistory', parameter);
        
        setIsLoading(false);
        
        if (history.status) {
            setHistory(history.data);
        }

    }, [user])

    function routeChange(path) {
        props.history.push(path);
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
            await apiCall.postAPI('http://localhost:3000/addHistory', parameter);
        }

        routeChange(`/playVideo/${btoa(videoId)}`);
    }

    async function removeHistory(videoId) {

        const parameter = {
            user_id: user._id,
            video_id: videoId
        }
        const history = await apiCall.postAPI('http://localhost:3000/removeHistory', parameter);

        displayAlert(history.status, history.msg);
        console.log(history);
        if (history.status) {
            window.location.reload();
        }
    }

    async function removeAllHistory() {

        const parameter = {
            user_id: user._id
        }
        const history = await apiCall.postAPI('http://localhost:3000/removeAllHistory', parameter);

        displayAlert(history.status, history.msg);

        if (history.status) {
            window.location.reload();
        }
    }

    function renderHistorr() {
        return history.map(vd => {
            return (
                <li key={vd._id}>
                    <div className="H-vd-queue">
                        <div className="video-list">
                            <div className="H-remove-btn">
                                <button onClick={() => removeHistory(vd._id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={() => playVideo(vd.video_id._id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="H-vd-content-container">
                                <VideoPlayer className="H-vd-content"
                                    src={vd.video_id.videoContent_link}
                                    poster={vd.video_id.thumbnailImage_link}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="H-vd-info">
                                <div className="H-history-date">{vd.createDate.substr(0, 10)}</div>
                                <div className="H-vd-name">{vd.video_id.videoName}</div>
                                <div className="H-vd-channel">{vd.video_id.channel_id.channelName}</div>
                                <div className="H-vd-views-time"><span>300K</span><span> • </span><span>{<TimeAgo date={vd.video_id.createDate} />}</span></div>
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
                <div className="H-vd-container">
                    <div className="H-header">
                        <div className="title">Your History</div>
                    </div>
                    <div className="signin-btn">
                        <h6 className="text-primary">Please, sign in to see your history...
                            <span><a href="/login" className="btn btn-outline-primary ml-4">SIGN IN</a></span></h6>
                    </div>
                </div>

            </>
        );
    } else {

        if (isLoading) {
            return (
                <>
                    <div className="H-vd-container">
                        <div className="H-header">
                            <div className="title">Your History</div>
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
            return history.length > 0
                ? (
                    <>
                        <div className="H-container">
                            <div className="H-vd-container">
                                <div className="H-header">
                                    <div className="title">Your History</div>
                                    <div className="H-clear-btn"><button onClick={() => removeAllHistory()} >Clear all history</button></div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <div>
                                        <div className="vd-video">{renderHistorr()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                ) : (
                    <>
                        <div className="H-vd-container">
                            <div className="H-header">
                                <div className="title">Your History</div>
                            </div>
                            <div className="no-history"><h3>No History</h3></div>
                        </div>
                    </>
                );
        }
    }
}

export default History;
