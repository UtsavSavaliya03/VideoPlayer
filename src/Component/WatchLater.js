import React, { useEffect, useState } from 'react';
import './Css/WatchLater.css';
import VideoPlayer from 'react-video-js-player';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/RakulPreet.jpg';
import ApiCall from '../ServiceManager/apiCall';
import { useSelector } from 'react-redux';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";
import Loader from '../ServiceManager/Loader';
import { ToastContainer, toast } from 'react-toastify';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

function WatchLater(props) {

    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [watchLater, setWatchLater] = useState('');

    useEffect(async () => {
        setIsLoading(true);

        const parameter = {
            user_id: user.user_id
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

        const parameter = {
            user_id: user.user_id,
            video_id: videoDetails
        }
        const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        routeChange('/playVideo');
    }

    async function removeWatchLater(videoId) {

        const parameter = {
            user_id: user.user_id,
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
            user_id: user.user_id
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
                                    src={Video}
                                    poster={Cover}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="WL-vd-info">
                                <div className="WL-vd-name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum saepe tenetur repudiandae quas necessitatibus, blanditiis, ullam cumque corrupti quod provident earum iusto inventore, voluptate id a ipsam molestias assumenda minus.</div>
                                <div className="WL-vd-channel">Sony music</div>
                                <div className="WL-vd-views-time"><span>300K</span><span> • </span><span>6 Years ago</span></div>
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

export default WatchLater;
