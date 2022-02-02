import './Css/CentralStyle.css';
import './Css/SearchResult.css';
import React, { useEffect, useState } from 'react';
import Loader from '../ServiceManager/Loader';
import ApiCall from '../ServiceManager/apiCall';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import millify from "millify";

let apiCall = new ApiCall;

export default function SearchResult() {

    const history = useHistory();
    const params = useParams();

    const isLogin = useSelector(state => state.isLogin);
    const user = useSelector(state => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [previousId, setPreviousId] = useState(null);

    if (previousId != null && previousId != params.name) {
        searchValue()
    }

    function routeChange(path) {
        history.push(path);
    }

    async function searchValue() {
        setIsLoading(true);
        setPreviousId(params.name);
        var videoUrl = `http://localhost:3000/searchVideo/${params.name}`;
        const videos = await apiCall.postAPI(videoUrl);
        setIsLoading(false);
        if (videos.status) {
            setVideos(videos.data);
        }
    }

    useEffect(() => {
        searchValue()
    }, []);

    async function viewHandler(videoId) {
        const viewUrl = `http://localhost:3000/addView/${videoId}`;
        const parameter = {
            user_id: user._id
        }

        await apiCall.postAPI(viewUrl, parameter);
    }

    async function videoPlay(videoId) {
        if (isLogin) {
            const parameter = {
                user_id: user._id,
                video_id: videoId
            }
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);
        }

        viewHandler(videoId);
        routeChange(`/playVideo/${btoa(videoId)}`);
        window.location.reload();
    }

    function renderVideos() {
        return videos.map(vd => {
            return (
                <div key={vd._id} className='S-vd-queue mb-2'>
                    <button className='btn-item p-0 w-100' onClick={() => videoPlay(vd._id)} >
                        <div className='row px-md-5 pt-1'>
                            <div className="col-12 col-md-4 col-lg-3">
                                <video width={'100%'} height={'160px'} poster={vd.thumbnailImage_link} >
                                    <source src={vd.videoContent_link} type="video/mp4" />
                                </video>
                            </div>
                            <div className="text-left col-12 col-md-8 col-lg-9 p-3 px-md-0 px-lg-0 py-lg-2 py-md-0">
                                <h5 className='break-title-2'>{vd.videoName}</h5>
                                <div className='row px-3' >
                                    <div className='d-inline'>
                                        <Avatar round={true} size='40px' src={vd.channel_id.channel_profile} />
                                    </div>
                                    <div className='d-inline align-self-center pl-3'>
                                        <h5 className='break-title-1 text-muted'>{vd.channel_id.channelName}</h5>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <h6 className='text-muted m-0'>{( millify(vd.views.length) + (vd.views.length > 1 ? " Views" : " View") ) + ' • '} <span>{<TimeAgo date={vd.createDate}/>}</span> </h6>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            )
        })
    }


    return (
        <>
            <div className='container-fluid'>
                <div className='m-0 mx-lg-5 p-0 px-lg-5 my-4'>
                    {
                        isLoading ? (
                            <div className="loader-container">
                                <Loader />
                                <h4 className='text-center text-muted'>Loading...</h4>
                            </div>
                        ) : (
                            <>
                                {
                                    videos.length > 0 ? (
                                        renderVideos()
                                    ) : (
                                        <h1 className="text-muted text-center mt-5">No Videos...</h1>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}
