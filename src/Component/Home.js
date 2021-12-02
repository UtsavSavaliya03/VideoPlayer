import './Css/Home.css';
import React, { useState, useEffect } from 'react';
import VideoPlayer from 'react-video-js-player';
import Video from '../assets/Video/Video.mp4';
import Avatar from 'react-avatar';
import Cover from '../assets/Video/VideoCover/RakulPreet.jpg';
import ApiCall from '../ServiceManager/apiCall';
import Uploads from './Studio/Uploads';

let apiCall = new ApiCall();

export default function Home(props) {

    const [arr, setArr] = useState([{ "_id": "0145", "name": "Love me thoda aur | Rakul Preat Singh kohli kohli kohli kohli kohli kohli kohli kohli kohli", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "02775", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0335", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0584", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "05568", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0685", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0790", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0823", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "09", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0136", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "0118", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "012879", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }])

    function routeChange(path) {
        props.history.push(path);
    }

    async function playVideo(videoDetails) {

        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id,
            video_id: videoDetails._id
        }
        const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        console.log(history);

        routeChange('/playVideo');
    }

    function renderVideos() {
        return arr.map(vd => {
            return (
                <li key={vd._id}>
                    <div className="vd-flex-item">
                        <button onClick={() => { playVideo(vd) }}>
                            <div>
                                <VideoPlayer src={Video} poster={Cover} bigPlayButton={false} controls={false} className="vd-cover" />
                            </div>
                            <div className="vd-info">
                                <div className="channel-logo">
                                    <Avatar round={true} size="40" name="Sony Music" />
                                </div>
                                <div className="channel-info">
                                    <div className="vd-name">{vd.name}</div>
                                    <div className="vd-channel">{vd.channel_name}</div>
                                    <div className="vd-views-time"><span>{vd.views}</span><span> • </span><span>{vd.time_line}</span></div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </button>
                    </div>
                </li>
            );
        })
    }

    return (
        <>
            {/* <Uploads /> */}
            <div className="home-container">
                <div className="vd-list">
                    <div className="d-flex flex-wrap justify-content-center">{renderVideos()}</div>
                </div>
            </div>
        </>
    );
}