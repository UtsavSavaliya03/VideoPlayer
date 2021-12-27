import React, { useEffect, useState } from 'react';
import './Css/LikedVd.css';
import VideoPlayer from 'react-video-js-player';
import TimeAgo from 'react-timeago';
import ApiCall from '../ServiceManager/apiCall';
import { useSelector } from 'react-redux';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";
import Loader from '../ServiceManager/Loader';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

export default function LikedVd() {

    const history = useHistory();

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [likedVd, setLikedVd] = useState('');

    useEffect(async () => {
        setIsLoading(true);

        const parameter = {
            user_id: user._id
        }
        const likedVd = await apiCall.postAPI('http://localhost:3000/getUserLike', parameter);

        setIsLoading(false);

        if (likedVd.status) {
            setLikedVd(likedVd.data);
        }
    }, [user]);

    function routeChange(path) {
        history.push(path);
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

    async function removeLikedVd(videoId) {

        const parameter = {
            user_id: user._id,
            video_id: videoId
        }
        const likedVd = await apiCall.postAPI('http://localhost:3000/removeLike', parameter);

        displayAlert(likedVd.status, likedVd.msg);

        if (likedVd.status) {
            window.location.reload();
        }
    }

    function renderLikedVd() {
        return likedVd.map(vd => {
            return (
                <li key={vd._id}>
                    <div className="L-vd-queue">
                        <div className="video-list">
                            <div className="L-remove-btn">
                                <button onClick={() => removeLikedVd(vd.video_id._id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={() => playVideo(vd.video_id._id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="L-vd-content-container">
                                <VideoPlayer className="L-vd-content"
                                    src={vd.video_id.videoContent_link}
                                    poster={vd.video_id.thumbnailImage_link}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="L-vd-info">
                                <div className="L-vd-name">{vd.video_id.videoName}</div>
                                <div className="L-vd-channel">{vd.video_id.channel_id.channelName}</div>
                                <div className="L-vd-views-time">{<TimeAgo date={vd.video_id.createDate} />}</div>
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
                <div className="L-vd-container">
                    <div className="L-header">
                        <div className="title">Your Liked Videos</div>
                    </div>
                    <div className="signin-btn">
                        <h6 className="text-primary">Please, sign in to see your liked videos...
                            <span><a href="/login" className="btn btn-outline-primary ml-4">SIGN IN</a></span></h6>
                    </div>
                </div>
            </>
        );
    } else {
        if (isLoading) {
            return (
                <>
                    <div className="L-vd-container">
                        <div className="L-header">
                            <div className="title">Your Liked Videos</div>
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
            return likedVd.length > 0
                ? (
                    <>
                        <div className="L-container">
                            <div className="L-vd-container">
                                <div className="L-header">
                                    <div className="title">Your Liked Videos</div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <table>
                                        <tbody className="vd-video">{renderLikedVd()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                ) : (
                    <>
                        <div className="L-vd-container">
                            <div className="L-header">
                                <div className="title">Your Liked Videos</div>
                            </div>
                            <div className="no-favourite"><h3>No Videos</h3></div>
                        </div>
                    </>
                );
        }
    }
}
