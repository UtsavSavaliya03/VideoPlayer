import './Css/Home.css';
import React, { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import Avatar from 'react-avatar';
import ApiCall from '../ServiceManager/apiCall';
import { useSelector } from 'react-redux';
import Loader from '../ServiceManager/Loader';
import { useHistory } from "react-router-dom";

let apiCall = new ApiCall();

// •

export default function Home(props) {

    let history = useHistory();

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(async () => {

        setIsLoading(true);

        const videos = await apiCall.postAPI('http://localhost:3000/getAllVd');

        setIsLoading(false);

        if (videos.status) {
            setVideos(videos.data);
        }
    }, [user])

    function routeChange(path) {
        history.push(path);
    }

    async function playVideo(videoDetails) {

        if (isLogin) {

            const parameter = {
                user_id: user._id,
                video_id: videoDetails._id,
            }
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);
        }

        routeChange(`/playVideo/${btoa(videoDetails._id)}`);

    }

    function renderVideos() {
        return videos.map(vd => {
            return (
                <li key={vd._id}>
                    <div className="vd-flex-item">
                        <button onClick={() => { playVideo(vd) }}>
                            <div>
                                <video className="vd-cover" poster={vd.thumbnailImage_link} >
                                    <source src={vd.videoContent_link} type="video/mp4" />
                                </video>
                            </div>
                            <div className="vd-info">
                                <div className="channel-logo">
                                    <Avatar round={true} src={vd.channel_id.channel_profile} size="40" name={vd.channel_id.channelName} />
                                </div>
                                <div className="channel-info">
                                    <div className="vd-name">{vd.videoName}</div>
                                    <div className="vd-channel">{vd.channel_id.channelName}</div>
                                    <div className="vd-views-time">{<TimeAgo date={vd.createDate} />}</div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </button>
                    </div>
                </li>
            );
        })
    }

    if (isLoading) {
        return (
            <>
                <div className="home-container">
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
        if (videos.length > 0) {
            return (
                <>
                    <div className="home-container">
                        <div className="vd-list">
                            {renderVideos()}
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="home-container">
                        <div className="no-videos"><h3>No Videos</h3></div>
                    </div>
                </>
            );
        }
    }
}