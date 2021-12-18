import React, { useEffect, useState } from 'react';
import './Css/Favourite.css';
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

function Favourite(props) {

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [favourite, setFavourite] = useState('');

    useEffect(async () => {
        setIsLoading(true);

        const parameter = {
            user_id: user._id
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/getFavourite', parameter);

        setIsLoading(false);

        if (favourite.status) {
            setFavourite(favourite.data);
        }
    }, [user]);

    function routeChange(path) {
        props.history.push(path);
    }

    console.log(favourite);

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

    async function removeFavourite(videoId) {

        const parameter = {
            user_id: user._id,
            video_id: videoId
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/removeFavourite', parameter);

        displayAlert(favourite.status, favourite.msg);

        if (favourite.status) {
            window.location.reload();
        }
    }

    async function removeAllFavourite() {

        const parameter = {
            user_id: user._id
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/removeAllFavourite', parameter);

        displayAlert(favourite.status, favourite.msg);

        if (favourite.status) {
            window.location.reload();
        }
    }

    function renderFavourite() {
        return favourite.map(vd => {
            return (
                <li key={vd._id}>
                    <div className="F-vd-queue">
                        <div className="video-list">
                            <div className="F-remove-btn">
                                <button onClick={() => removeFavourite(vd.video_id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={() => playVideo(vd.video_id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="F-vd-content-container">
                                <VideoPlayer className="F-vd-content"
                                    src={vd.video_id.videoContent_link}
                                    poster={vd.video_id.thumbnailImage_link}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="F-vd-info">
                                <div className="F-vd-name">{vd.video_id.videoName}</div>
                                <div className="F-vd-channel">{vd.video_id.channel_id.channelName}</div>
                                <div className="F-vd-views-time"><span>300K</span><span> • </span><span>{<TimeAgo date={vd.video_id.createDate} />}</span></div>
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
                <div className="F-vd-container">
                    <div className="F-header">
                        <div className="title">Your Favourites</div>
                    </div>
                    <div className="signin-btn">
                        <h6 className="text-primary">Please, sign in to see your favourite videos...
                            <span><a href="/login" className="btn btn-outline-primary ml-4">SIGN IN</a></span></h6>
                    </div>
                </div>
            </>
        );
    } else {

        if (isLoading) {
            return (
                <>
                    <div className="F-vd-container">
                        <div className="F-header">
                            <div className="title">Your Favourites</div>
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
            return favourite.length > 0
                ? (
                    <>
                        <div className="F-container">
                            <div className="F-vd-container">
                                <div className="F-header">
                                    <div className="title">Your Favourites</div>
                                    <div className="F-clear-btn"><button onClick={() => removeAllFavourite()}>Remove all</button></div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <table>
                                        <tbody className="vd-video">{renderFavourite()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                ) : (
                    <>
                        <div className="F-vd-container">
                            <div className="F-header">
                                <div className="title">Your Favourites</div>
                            </div>
                            <div className="no-favourite"><h3>No Favourites</h3></div>
                        </div>
                    </>
                );
        }
    }
}

export default Favourite;
