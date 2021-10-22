import './Css/Home.css';
import React, { useState } from 'react';
import VideoPlayer from 'react-video-js-player';
import logo from '../assets/Images/user.png';
import Header from './Header';
import UserHeader from './UserHeader';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/videoCover.jpg';

export default function Home(props) {

    const [arr, setArr] = useState([{ "_id": "01", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "02", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "03", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "04", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "05", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "06", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "07", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "08", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "09", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "10", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "11", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "12", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }]);

    function routeChange(path) {
        props.history.push(path);
    }

    function playVideo() {
        routeChange('/playVideo');
    }

    function renderTableRow() {
        return arr.map(vd => {
            return (
                <tr key={vd._id}>
                    <div className="vd-flex-item">
                        <button onClick={() => { playVideo()}}>
                            <div>
                                <VideoPlayer src={Video} poster={Cover} bigPlayButton={false} controls={false} className="vd-cover" />
                            </div>
                            <div className="vd-info">
                                <div className="channel-logo">
                                    <img src={logo} alt="channel Logo" />
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
                </tr>
            );
        })
    }
    return (
        <>
            {/* <UserHeader /> */}
            <Header />
            <div className="vd-list">
                <div className="d-flex flex-wrap justify-content-center">{renderTableRow()}</div>
            </div>
        </>
    )
}
