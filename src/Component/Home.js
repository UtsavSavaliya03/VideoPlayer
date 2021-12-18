import './Css/Home.css';
import React, { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import Avatar from 'react-avatar';
import ApiCall from '../ServiceManager/apiCall';
import { useSelector } from 'react-redux';
import Loader from '../ServiceManager/Loader';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../State/action-creators/index';

let apiCall = new ApiCall();

export default function Home(props) {

    let history = useHistory();

    const dispatch = useDispatch();
    const action = bindActionCreators(actionCreators, dispatch);

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);
    const currentVd = useSelector((state) => state.currentVd);

    const [arr, setArr] = useState([{ "_id": "0145", "name": "Love me thoda aur | Rakul Preat Singh kohli kohli kohli kohli kohli kohli kohli kohli kohli", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "02775", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0335", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0584", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "05568", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0685", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0790", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0823", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "09", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0136", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0118", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "012879", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }])
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

        action.setCurrentVd(videoDetails);
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
                                    <div className="vd-views-time"><span>300K</span><span> • </span><span>{<TimeAgo date={vd.createDate} />}</span></div>
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
                        {/* <img height='500px' width='500px' src={user.profile_picture} alt='asdfghjkl' /> */}
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