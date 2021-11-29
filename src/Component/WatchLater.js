import React, { useState } from 'react';
import './Css/WatchLater.css';
import VideoPlayer from 'react-video-js-player';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/RakulPreet.jpg';
import ApiCall from '../ServiceManager/apiCall';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";
import Loader from '../ServiceManager/Loader';
import { ToastContainer, toast } from 'react-toastify';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

class WatchLater extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            watchLater: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })

        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id
        }
        const watchLater = await apiCall.postAPI('http://localhost:3000/getWatchLater', parameter);

        this.setState({ isLoading: false })

        if (watchLater.status) {
            this.setState({ watchLater: watchLater.data });
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
    }

    displayAlert = (type, alertMsg) => {
        if (type == true) {
            toast.success(alertMsg, {
                position: "top-center"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-center"
            })
        }
    }

    playVideo = async (videoDetails) => {

        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id,
            video_id: videoDetails
        }
        const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        this.routeChange('/playVideo');
    }

    removeWatchLater = async (videoId) => {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id,
            video_id: videoId
        }
        const watchLater = await apiCall.postAPI('http://localhost:3000/removeWatchLater', parameter);

        this.displayAlert(watchLater.status, watchLater.msg);

        if (watchLater.status) {
            window.location.reload();
        }
    }

    removeAllWatchLater = async () => {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id
        }
        const watchLater = await apiCall.postAPI('http://localhost:3000/removeAllWatchLater', parameter);

        this.displayAlert(watchLater.status, watchLater.msg);

        if (watchLater.status) {
            window.location.reload();
        }
    }

    renderWatchLater = () => {
        return this.state.watchLater.map(vd => {
            return (
                <tr key={vd._id}>
                    <td className="WL-vd-queue">
                        <div className="video-list">
                            <div className="WL-remove-btn">
                                <button onClick={() => this.removeWatchLater(vd.video_id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={() => this.playVideo(vd.video_id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="WL-vd-content-container">
                                <VideoPlayer className="WL-vd-content"
                                    src={Video}
                                    poster={Cover}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="WL-vd-info">
                                <div className="WL-vd-name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum saepe tenetur repudiandae quas necessitatibus, blanditiis, ullam cumque corrupti quod provident earum iusto inventore, voluptate id a ipsam molestias assumenda minus.</div>
                                <div className="WL-vd-channel">Sony music</div>
                                <div className="WL-vd-views-time"><span>300K</span><span> • </span><span>6 Years ago</span></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </td>
                </tr>
            );
        })
    }

    render() {
        const { watchLater, isLoading } = this.state;

        if (isLoading) {
            return (
                <>
                    <div className="WL-vd-container">
                        <div className="WL-header">
                            <div className="title">Watch Later</div>
                        </div>
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
            return watchLater.length > 0
                ? (
                    <>
                        <div className="WL-container">
                            <div className="WL-vd-container">
                                <div className="WL-header">
                                    <div className="title">Watch Later</div>
                                    <div className="WL-clear-btn"><button onClick={()=>this.removeAllWatchLater()} >Remove all</button></div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <table>
                                        <tbody className="vd-video">{this.renderWatchLater()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                ) : (
                    <>
                        <div className="WL-vd-container">
                            <div className="WL-header">
                                <div className="title">Watch Later</div>
                            </div>
                            <div className="no-watch-later"><h3>No Watch Later</h3></div>
                        </div>
                    </>
                );
        }
    }
}

export default WatchLater;
