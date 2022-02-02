import React, { useEffect, useState } from 'react';
import './Css/CentralStyle.css';
import './Css/LikedVd.css';
import TimeAgo from 'react-timeago';
import ApiCall from '../ServiceManager/apiCall';
import { useSelector } from 'react-redux';
import Loader from '../ServiceManager/Loader';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import millify from "millify";

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

export default function LikedVd() {

    const history = useHistory();

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [likedVd, setLikedVd] = useState([]);

    useEffect(async () => {
        loadLikedVideos();
    }, [user]);

    async function loadLikedVideos() {
        setIsLoading(true);

        const parameter = {
            user_id: user._id
        }
        const likedVd = await apiCall.postAPI('http://localhost:3000/getUserLike', parameter);

        setIsLoading(false);

        if (likedVd.status) {
            setLikedVd(likedVd.data);
        }
    }

    function routeChange(path) {
        history.push(path);
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

    async function viewHandler(videoId) {
        const viewUrl = `http://localhost:3000/addView/${videoId}`;
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
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        }

        viewHandler(videoId);
        routeChange(`/playVideo/${btoa(videoId)}`);
    }

    async function removeLikedVd(e, videoId) {

        e.stopPropagation();

        const parameter = {
            user_id: user._id,
            video_id: videoId
        }
        const removedLikedVd = await apiCall.postAPI('http://localhost:3000/removeLike', parameter);

        displayAlert(removedLikedVd.status, removedLikedVd.msg);

        if (removedLikedVd.status) {
            loadLikedVideos();
            if (likedVd.length == 1) {
                setLikedVd([]);
            }
        }
    }

    function renderLikedVd() {
        return likedVd.map(vd => {
            return (
                <div key={vd._id} className="L-vd-queue mb-2">
                    <button onClick={() => playVideo(vd.video_id._id)} className='vd-play-btn p-0 pt-1 w-100 text-left'>
                        <div className="row mx-0 mx-lg-5">
                            <div className="col-12 col-md-5 col-lg-3 p-md-0">
                                <video width={'100%'} height={'160px'} poster={vd.video_id.thumbnailImage_link} >
                                    <source src={vd.video_id.videoContent_link} type="video/mp4" />
                                </video>
                            </div>
                            <div className="col-12 col-md-7 col-lg-9 pr-md-0 pt-md-2">
                                <div><h5 className='break-title-2'>{vd.video_id.videoName}</h5></div>
                                <div><h5 className="break-title-1 text-muted">{vd.video_id.channel_id.channelName}</h5></div>
                                <div><h6 className='text-muted m-0'>{( millify(vd.video_id.views.length) + (vd.video_id.views.length > 1 ? " Views" : " View") ) + ' • '} <span>{<TimeAgo date={vd.video_id.createDate}/>}</span> </h6></div>
                                <button onClick={(e) => removeLikedVd(e, vd.video_id._id)} className='remove-fvourites-btn p-0 mt-2'><i class="far fa-trash-alt mr-2"></i>REMOVE FROM LIKED VIDEOS</button>
                            </div>
                        </div>
                    </button>
                </div>
            );
        })
    }

    return (
        <>
            <div className="L-container">
                <div className="L-vd-container p-0 m-0 px-md-5 mx-md-5">
                    <div className="L-header p-2 px-md-5 mb-3 d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className='m-0'>Your Liked Videos</h3>
                        </div>
                    </div>
                    <div className='py-5 bg-light my-3'>
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
                                        likedVd.length > 0
                                            ? (
                                                renderLikedVd()
                                            ) : (
                                                <div className="no-liked-videos"><h3 className='text-muted'>No Liked Videos</h3></div>
                                            )
                                    ) : (
                                        <div className="signin-btn">
                                            <h6 className="text-primary">Please, sign in to see your Liked videos...
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
