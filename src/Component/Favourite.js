import React, { useEffect, useState } from 'react';
import './Css/CentralStyle.css';
import './Css/Favourite.css';
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

function Favourite(props) {

    const history = useHistory();

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [favourite, setFavourite] = useState([]);

    useEffect(() => {
        loadFavouriteVideos();
    }, [user]);

    async function loadFavouriteVideos() {
        setIsLoading(true);

        const parameter = {
            user_id: user._id
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/getFavourite', parameter);

        setIsLoading(false);

        if (favourite.status) {
            setFavourite(favourite.data);
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

    async function removeFavourite(e, videoId) {

        e.stopPropagation();

        const parameter = {
            user_id: user._id,
            video_id: videoId
        }
        const removedFavourite = await apiCall.postAPI('http://localhost:3000/removeFavourite', parameter);

        displayAlert(removedFavourite.status, removedFavourite.msg);

        if (removedFavourite.status) {
            loadFavouriteVideos();
            if (favourite.length == 1) {
                setFavourite([]);
            }
        }
    }

    async function removeAllFavourite() {

        const parameter = {
            user_id: user._id
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/removeAllFavourite', parameter);

        displayAlert(favourite.status, favourite.msg);

        if (favourite.status) {
            loadFavouriteVideos();
            setFavourite([]);
        }
    }

    function renderFavourite() {
        return favourite.map(vd => {
            return (
                <div key={vd._id} className="F-vd-queue mb-2">
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
                                <button onClick={(e) => removeFavourite(e, vd.video_id._id)} className='remove-fvourites-btn p-0 mt-2'><i class="far fa-trash-alt mr-2"></i>REMOVE FROM FAVOURITES</button>
                            </div>
                        </div>
                    </button>
                </div>
            );
        })
    }

    return (
        <>
            <div className="F-container">
                <div className="F-vd-container p-0 m-0 px-md-5 mx-md-5">
                    <div className="F-header p-2 px-md-5 mb-3 d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className='m-0'>Your Favourites</h3>
                        </div>
                        {favourite.length > 0 &&
                            <div>
                                <button
                                    onClick={removeAllFavourite}
                                    className='remove-all-fvourites-btn'
                                    type="button"
                                >
                                    <i class="far fa-trash-alt mr-2"></i>
                                    CLEAR ALL
                                </button>
                            </div>
                        }
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
                                        favourite.length > 0
                                            ? (
                                                renderFavourite()
                                            ) : (
                                                <div className="no-favourite"><h3 className='text-muted'>No Favourites</h3></div>
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

export default Favourite;
