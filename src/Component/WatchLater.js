import React, { useEffect, useState } from 'react';
import './Css/CentralStyle.css';
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
        loadWatchLaterVideos();
    }, [user]);

    async function loadWatchLaterVideos() {
        setIsLoading(true);

        const parameter = {
            user_id: user._id
        }
        const watchLater = await apiCall.postAPI('http://localhost:3000/getWatchLater', parameter);

        setIsLoading(false);

        if (watchLater.status) {
            setWatchLater(watchLater.data);
        }
    }

    function routeChange(path) {
        props.history.push(path);
    }

    function displayAlert(type, alertMsg) {
        if (type == true) {
            toast.success(alertMsg, {
                position: "top-right"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-right"
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
    }

    async function removeWatchLater(e, videoId) {

        e.stopPropagation();

        const parameter = {
            user_id: user._id,
            video_id: videoId
        }
        const removedWatchLater = await apiCall.postAPI('http://localhost:3000/removeWatchLater', parameter);

        displayAlert(removedWatchLater.status, removedWatchLater.msg);

        if (removedWatchLater.status) {
            loadWatchLaterVideos();
            if (watchLater.length == 1) {
                setWatchLater([]);
            }
        }
    }

    async function removeAllWatchLater() {

        const parameter = {
            user_id: user._id
        }
        const removedWatchLater = await apiCall.postAPI('http://localhost:3000/removeAllWatchLater', parameter);

        displayAlert(removedWatchLater.status, removedWatchLater.msg);

        if (removedWatchLater.status) {
            loadWatchLaterVideos();
            setWatchLater([]);
        }
    }

    function renderWatchLater() {
        return watchLater.map(vd => {
            return (
                <div key={vd._id} className="WL-vd-queue mb-2">
                    <button onClick={() => playVideo(vd.video_id._id)} className='vd-play-btn p-0 pt-1 w-100 text-left'>
                        <div className="row mx-0 mx-lg-5">
                            <div className="col-12 col-md-5 col-lg-3 p-md-0">
                                <video width={'100%'} height={'160px'} poster={vd.video_id.thumbnailImage_link} >
                                    <source src={vd.video_id.videoContent_link} type="video/mp4" />
                                </video>
                            </div>
                            <div className="col-12 col-md-7 col-lg-9 pr-md-0 pt-md-2">
                                <div><h5 className='break-title-2'>{vd.video_id.videoName}</h5></div>
                                <div><h5 className="text-muted">{vd.video_id.channel_id.channelName}</h5></div>
                                <div><h6 className='text-muted'>{<TimeAgo date={vd.video_id.createDate} />}</h6></div>
                                <button onClick={(e) => removeWatchLater(e, vd.video_id._id)} className='remove-fvourites-btn p-0 mt-2'><i class="far fa-trash-alt mr-2"></i>REMOVE FROM WATCH LATER</button>
                            </div>
                        </div>
                    </button>
                </div>
            );
        })
    }

    return (
        <>
            <div className="WL-container">
                <div className="WL-vd-container p-0 m-0 px-md-5 mx-md-5">
                    <div className="WL-header p-2 px-md-5 mb-3 d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className='m-0'>Your Watch Later</h3>
                        </div>
                        {watchLater.length > 0 &&
                            <div>
                                <button
                                    onClick={removeAllWatchLater}
                                    className='remove-all-fvourites-btn'
                                    type="button"
                                >
                                    <i class="far fa-trash-alt mr-2"></i>
                                    CLEAR ALL
                                </button>
                            </div>
                        }
                    </div>
                    <div className='py-5 bg-light my-2'>
                        <h2 className='text-center'>Advertisement</h2>
                    </div>
                    <div>
                        {isLoading
                            ? (
                                <div className="spinner">
                                    <Loader />
                                    <div className="text-center text-muted"><h3>Loading...</h3></div>
                                </div>
                            ) : (
                                isLogin
                                    ? (
                                        watchLater.length > 0
                                            ? (
                                                renderWatchLater()
                                            ) : (
                                                <div className="no-favourite"><h3 className='text-muted'>No Watch Later</h3></div>
                                            )
                                    ) : (
                                        <div className="signin-btn">
                                            <h6 className="text-primary">Please, sign in to see your favourite videos...
                                                <span><a href="/login" className="btn btn-outline-primary ml-4">SIGN IN</a></span></h6>
                                        </div>
                                    )

                            )
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default WatchLater;
