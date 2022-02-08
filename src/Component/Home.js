import './Css/CentralStyle.css';
import './Css/Home.css';
import React, { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import Avatar from 'react-avatar';
import ApiCall from '../ServiceManager/apiCall';
import { useSelector } from 'react-redux';
import Loader from '../ServiceManager/Loader';
import { useHistory } from "react-router-dom";
import millify from "millify";
import Slider from "react-slick";
import Ad from './add';

// Import css files Slick Slider (CSS)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Adsense } from '@ctrl/react-adsense';

let apiCall = new ApiCall();

export default function Home() {

    let history = useHistory();

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [videos, setVideos] = useState([]);

    const category = [{ "name": "Entertainment" }, { "name": "Music" }, { "name": "Crypto" }, { "name": "Health" }, { "name": "Art" }, { "name": "Education" }, { "name": "Yoga" }, { "name": "Doctor" }, { "name": "Environment" }, { "name": "Bussiness" }, { "name": "software" }, { "name": "IoT" }]

    var slider = {
        dots: false,
        speed: 1000,
        infinite: category.length > 1 ? true : false,
        centerMode: true,
        variableWidth: true
    };

    useEffect(async () => {

        setIsLoading(true);

        const videos = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/getAllVd');

        setIsLoading(false);

        if (videos.status) {
            setVideos(videos.data);
        }
    }, [user])

    function routeChange(path) {
        history.push(path);
    }

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
                video_id: videoId,
            }
            const history = await apiCall.postAPI('https://video-player-api-demo.herokuapp.com/addHistory', parameter);
        }

        viewHandler(videoId);
        routeChange(`/playVideo/${btoa(videoId)}`);

    }

    async function setCategoryVideoHandler(category) {
        setIsLoading(true);

        const url = `https://video-player-api-demo.herokuapp.com/categoryVd/${category}`;
        const categoryVideos = await apiCall.postAPI(url);

        setIsLoading(false);

        if (categoryVideos.status) {
            setVideos(categoryVideos.data);
        }
    }

    function renderCategory() {
        return category.map(category => {
            return (
                <div key={category.key}>
                    <button
                        onClick={() => setCategoryVideoHandler(category.name)}
                        className='category-btn mx-2'
                    >
                        {category.name}
                    </button>
                </div>
            )
        })
    }

    function renderVideos() {
        return videos.map(vd => {
            return (
                <div key={vd._id}>
                    <div className="vd-flex-item my-3 m-md-3">
                        <button onClick={() => { playVideo(vd._id) }}>
                            <div>
                                <video className='vd-cover' poster={vd.thumbnailImage_link} >
                                    <source src={vd.videoContent_link} type="video/mp4" />
                                </video>
                            </div>
                            <div className="vd-info row">
                                <div className="col-2 p-0">
                                    <Avatar round={true} src={vd.channel_id.channel_profile} size="40" name={vd.channel_id.channelName} />
                                </div>
                                <div className="col-10 p-0 text-left">
                                    <div><h6 className='break-title-2'>{vd.videoName}</h6></div>
                                    <div><p className='text-muted m-0 break-title-1'>{vd.channel_id.channelName}</p></div>
                                    <div><p className='text-muted m-0'>{(millify(vd.views.length) + (vd.views.length > 1 ? " Views" : " View")) + ' • '} <span>{<TimeAgo date={vd.createDate} />}</span> </p></div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            );
        })
    }
    return (
        <>
            <div className="container-fluid pb-5">
                <div className='my-2'>
                    <Ad />
                    <Adsense
                        client="pub-8525725600038548"
                        slot="6728438510"
                    />
                </div>
                {/* <div className='py-5 bg-light my-2'>
                    <h2 className='text-center'>Advertisement</h2>
                </div> */}
                <div className='mt-3 py-2 border-top border-bottom'>
                    <Slider {...slider}>
                        {renderCategory()}
                    </Slider>
                </div>
                {
                    isLoading ? (
                        <div className="spinner">
                            <div className="spinner-img">
                                <Loader />
                            </div>
                            <div className="text-muted text-center"><h3>Loading...</h3></div>
                        </div>
                    ) : (
                        videos.length > 0 ? (
                            <div className="d-flex flex-wrap justify-content-center mx-md-5">
                                {renderVideos()}
                            </div>
                        ) : (
                            <div className="no-videos"><h3 className='text-muted'>No Videos</h3></div>
                        )

                    )
                }
            </div>
        </>
    );
}