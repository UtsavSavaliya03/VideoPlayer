import React, { useState } from 'react'
import './Css/VideoPlay.css';
import VideoPlayer from 'react-video-js-player';
import user from '../assets/Images/user.png';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/videoCover.jpg';

export default function VideoPlay() {

    const [video, setVideo] = useState(Video);
    const [cover, setCover] = useState(Cover);
    const [arr, setArr] = useState([{ "_id": "01", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "02", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "03", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "04", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "05", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "06", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "07", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "08", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "09", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }]);
    const [cmt, setCmt] = useState([{ "_id": "01", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "02", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "03", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "01", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "04", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "05", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "06", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "07", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "08", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "09", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "10", "userName": "Test123", "cmt_text": "Nice content brother." }])

    function renderTableRows() {
        return arr.map(vd => {
            return (
                <tr key={vd._id}>
                    <td className="vd-queue">
                        <div className="vd-content-container">
                            <VideoPlayer className="vd-content" />
                        </div>
                        <div className="vd-info">
                            <div className="vd-name">{vd.name}</div>
                            <div className="vd-channel">{vd.channel_name}</div>
                            <div className="vd-views-time"><span>{vd.views}</span><span> • </span><span>{vd.time_line}</span></div>
                        </div>
                        <div className="clear"></div>
                    </td>
                </tr>
            );
        })
    }

    function renderComment() {
        return cmt.map((cmt) => {
            return (
                <tr key={cmt._id} >
                    <div className="user-comment">
                        <div className="user-profile">
                            <img src={user} alt="User Profile" />
                        </div>
                        <div className="user-info">
                            <p className="name">{cmt.userName}</p>
                            <p className="comment">{cmt.cmt_text}</p>
                        </div>
                        <div className="clear"></div>
                    </div>
                </tr>
            )
        });
    }

    return (
        <div>
            <div className="video-container">
                <div className="vd-playing-cotainer">
                    <VideoPlayer className="vd-playing"
                        src={video}
                        poster={cover}
                    />
                    <div className="video-details">
                        <div className="vd-name">
                            <p>Love me thoda aur | Rakul Preat Singh</p>
                        </div>
                        <div className="vd-view-time">
                            <span>300K</span><span> • </span><span>6 Years ado</span>
                        </div>
                    </div><hr />
                    <div className="channel">
                        <div className="logo">
                            <img src={user} alt="Channel Logo" />
                        </div>
                        <div className="channel-info">
                            <p className="name">Sony Musics</p>
                            <p className="subscribers">30M Subscribers</p>
                        </div>
                        <div className="subscribe-btn">
                            <button className="btn btn-danger">SUBSCRIBE</button>
                        </div>
                        <div className="clear"></div>
                    </div><hr />
                    <div className="comment-container">{renderComment()}</div>
                </div>
                <div className="vd-list-container">
                    <div>
                        <table>
                            <tbody className="vd-video">{renderTableRows()}</tbody>
                        </table>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        </div>
    )
}
