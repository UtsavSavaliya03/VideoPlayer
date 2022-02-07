import '../Css/CentralStyle.css';
import './Css/Content.css';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TimeAgo from 'react-timeago';
import ApiCall from '../../ServiceManager/apiCall';
import Loader from '../../ServiceManager/Loader';
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import millify from "millify";

let apiCall = new ApiCall;

function Content() {

    let history = useHistory();

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);
    const userChannel = useSelector((state) => state.userChannel);

    const [isLoading, setIsLoading] = useState(false);
    const [channelVideo, setChannelVideo] = useState([]);

    function routeChange(path) {
        history.push(path);
    }

    useEffect(async () => {
        loadChannelVideo();
    }, [userChannel]);

    async function loadChannelVideo() {
        setIsLoading(true);

        const parameter = {
            channel_id: userChannel._id
        }
        const channelVideo = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/getChannelVd', parameter);

        setIsLoading(false);

        if (channelVideo.status) {
            setChannelVideo(channelVideo.data);
        }
    }

    function confirmDelete(e, videoId) {

        e.stopPropagation();

        confirmAlert({
            title: 'Confirm To Delete',
            message: 'Are you sure to delete this Video ?',
            buttons: [
                {
                    label: 'CANCEL'
                },
                {
                    label: 'CONFIRM',
                    onClick: () => removeVideo(videoId)
                }
            ]
        })
    };

    async function viewHandler(videoId) {
        const viewUrl = `https://video-player-api-demo.herokuapp.com/addView/${videoId}`;
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
            const history = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/addHistory', parameter);

        }

        viewHandler(videoId);
        routeChange(`/playVideo/${btoa(videoId)}`);
        window.location.reload();
    }

    async function removeVideo(videoId) {
        const videoUrl = `https://video-player-api-demo.herokuapp.com/removeVideo/${videoId}`;
        const video = await apiCall.postAPI(videoUrl);

        if (video.status) {
            loadChannelVideo();
            if (channelVideo.length == 1) {
                setChannelVideo([]);
            }
        }
    }

    function renderChannelVideo() {
        return channelVideo.map(vd => {
            return (
                <div key={vd._id} className="CV-vd-queue mb-2">
                    <button onClick={() => playVideo(vd._id)} className='vd-play-btn p-0 pt-1 w-100 text-left'>
                        <div className="row mx-0 mx-lg-5">
                            <div className="col-12 col-md-5 col-lg-3 p-md-0">
                                <video width={'100%'} height={'160px'} poster={vd.thumbnailImage_link} >
                                    <source src={vd.videoContent_link} type="video/mp4" />
                                </video>
                            </div>
                            <div className="col-12 col-md-7 col-lg-9 pr-md-0 pt-md-2">
                                <div><h5 className='break-title-2'>{vd.videoName}</h5></div>
                                <div><h5 className="break-title-1 text-muted">{vd.channel_id.channelName}</h5></div>
                                <div><h6 className='text-muted m-0'>{( millify(vd.views.length) + (vd.views.length > 1 ? " Views" : " View") ) + ' • '} <span>{<TimeAgo date={vd.createDate}/>}</span> </h6></div>
                                <button onClick={(e) => confirmDelete(e, vd._id)} className='remove-video-btn p-0 mt-2 text-uppercase'><i class="far fa-trash-alt mr-2"></i>Delete Permanently</button>
                            </div>
                        </div>
                    </button>
                </div>
            );
        })
    }

    return (
        <>
            <div className="CV-container">
                <div className="CV-vd-container p-0 m-0 px-md-5 mx-md-5">
                    <div className="CV-header p-2 px-md-5 mb-3 d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className='m-0 ml-3'>Your Videos</h3>
                        </div>
                    </div>
                    <div>
                        {isLoading
                            ? (
                                <div className="spinner">
                                    <Loader />
                                    <div className="text-center text-muted"><h3>Loading...</h3></div>
                                </div>
                            ) : (
                                channelVideo.length > 0
                                    ? (
                                        renderChannelVideo()
                                    ) : (
                                        <div className='my-5 py-5'><h3 className='text-muted text-center py-5'>No Videos Uploaded</h3></div>
                                    )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Content;