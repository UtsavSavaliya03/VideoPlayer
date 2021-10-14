import React, { useState } from 'react'
import './Css/VideoPlay.css';
import VideoPlayer from 'react-video-js-player';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/videoCover.jpg';

export default function VideoPlay() {

    const [video, setVideo] = useState(Video);
    const [cover, setCover] = useState(Cover);
    const [arr, setArr] = useState([{ "_id": "01", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "02", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "03", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "04", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "05", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "06", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "07", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "08", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "09", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }]);

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

    return (
        <div>
            <div className="video-container">
                <div className="vd-playing-cotainer">
                    <VideoPlayer className="vd-playing"
                        src={video}
                        poster={cover}
                    />
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
