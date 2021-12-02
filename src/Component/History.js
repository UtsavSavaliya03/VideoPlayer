import React, { useState, useEffect } from 'react';
import './Css/History.css';
import VideoPlayer from 'react-video-js-player';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/RakulPreet.jpg';
import ApiCall from '../ServiceManager/apiCall';
import Loader from '../ServiceManager/Loader';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall();

function History(props) {
    
    const user = useSelector((state)=> state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState('');

    useEffect(async () => {

        setIsLoading(true);

        const parameter = {
            user_id: user.user_id
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

    async function playVideo(videoDetails) {

        const parameter = {
            user_id: user.user_id,
            video_id: videoDetails
        }
        await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        routeChange('/playVideo');
    }

    async function removeHistory(videoId) {

        const parameter = {
            user_id: user.user_id,
            video_id: videoId
        }
        const history = await apiCall.postAPI('http://localhost:3000/removeHistory', parameter);

        displayAlert(history.status, history.msg);

        if (history.status) {
            window.location.reload();
        }
    }

    async function removeAllHistory() {

        const parameter = {
            user_id: user.user_id
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
                                <button onClick={() => removeHistory(vd.video_id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={() => playVideo(vd.video_id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="H-vd-content-container">
                                <VideoPlayer className="H-vd-content"
                                    src={Video}
                                    poster={Cover}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="H-vd-info">
                                <div className="H-history-date">{vd.createDate.substr(0, 10)}</div>
                                <div className="H-vd-name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quae enim amet reiciendis illo, modi tenetur fugiat exercitationem soluta ipsa, quo laudantium nobis dolore harum saepe corporis distinctio! Pariatur, eum!</div>
                                <div className="H-vd-channel">Sony music</div>
                                <div className="H-vd-views-time"><span>300K</span><span> • </span><span>6 Years ago</span></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </li>
            );
        })
    }

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

export default History;
