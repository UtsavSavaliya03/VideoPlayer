import React, { useState } from 'react';
import './Css/Favourite.css';
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

class Favourite extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            favourite: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })

        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/getFavourite', parameter);
        console.log(favourite);
        this.setState({ isLoading: false })

        if (favourite.status) {
            this.setState({ favourite: favourite.data });
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
    }

    playVideo = async (videoDetails) => {
        
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id,
            video_id: videoDetails
        }
        const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        console.log(history);

        this.routeChange('/playVideo');
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

    removeFavourite = async (videoId) => {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id,
            video_id: videoId
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/removeFavourite', parameter);

        this.displayAlert(favourite.status, favourite.msg);

        if (favourite.status) {
            window.location.reload();
        }
    }

    removeAllFavourite = async () => {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id
        }
        const favourite = await apiCall.postAPI('http://localhost:3000/removeAllFavourite', parameter);

        this.displayAlert(favourite.status, favourite.msg);

        if (favourite.status) {
            window.location.reload();
        }
    }

    renderFavourite = () => {
        return this.state.favourite.map(vd => {
            return (
                <tr key={vd._id}>
                    <div className="F-vd-queue">
                        <div className="video-list">
                            <div className="F-remove-btn">
                                <button onClick={() => this.removeFavourite(vd.video_id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={()=> this.playVideo(vd.video_id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="F-vd-content-container">
                                <VideoPlayer className="F-vd-content"
                                    src={Video}
                                    poster={Cover}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="F-vd-info">
                                <div className="F-vd-name">Love me thoda aur | Rakul Preat Singh Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit repellat vel animi, quam earum voluptatum reiciendis quae natus iste recusandae, dignissimos pariatur cum at unde, iure temporibus aspernatur corporis ad!</div>
                                <div className="F-vd-channel">Sony Music</div>
                                <div className="F-vd-views-time"><span>300K</span><span> • </span><span>6 Years ago</span></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </tr>
            );
        })
    }

    render() {
        const { favourite, isLoading } = this.state;

        if (isLoading) {
            return (
                <>
                    <div className="F-vd-container">
                        <div className="F-header">
                            <div className="title">Your Favourites</div>
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
            return favourite.length > 0
                ? (
                    <>
                        <div className="F-container">
                            <div className="F-vd-container">
                                <div className="F-header">
                                    <div className="title">Your Favourites</div>
                                    <div className="F-clear-btn"><button onClick={() => this.removeAllFavourite()}>Remove all</button></div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <table>
                                        <tbody className="vd-video">{this.renderFavourite()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                ) : (
                    <>
                        <div className="F-vd-container">
                            <div className="F-header">
                                <div className="title">Your Favourites</div>
                            </div>
                            <div className="no-favourite"><h3>No Favourites</h3></div>
                        </div>
                    </>
                );
        }
    }
}

export default Favourite;
