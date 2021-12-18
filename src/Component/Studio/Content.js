import './Css/content.css';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from 'react-video-js-player';
import ApiCall from '../../ServiceManager/apiCall';
import Loader from '../../ServiceManager/Loader';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../State/action-creators/index';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";

let apiCall = new ApiCall;

function Content() {

    let history = useHistory();

    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);
    const userChannel = useSelector((state) => state.userChannel);

    const dispatch = useDispatch();
    const action = bindActionCreators(actionCreators, dispatch);

    const [isLoading, setIsLoading] = useState(false);
    const [channelVideo, setChannelVideo] = useState('');

    function routeChange(path) {
        history.push(path);
    }

    useEffect(async () => {
        setIsLoading(true);

        const parameter = {
            channel_id: userChannel._id
        }
        const channelVideo = await apiCall.postAPI('http://localhost:3000/getChannelVd', parameter);
        console.log(channelVideo);

        setIsLoading(false);

        if (channelVideo.status) {
            setChannelVideo(channelVideo.data);
        }
    }, [userChannel]);


    async function playVideo(videoDetails) {

        if (isLogin) {

            const parameter = {
                user_id: user._id,
                video_id: videoDetails
            }
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        }

        action.setCurrentVd(videoDetails);
        routeChange('/playVideo');
    }

    function renderChannelVideo() {
        return channelVideo.map(vd => {
            return (
                <li key={vd._id}>
                    <div className="CV-vd-queue">
                        <div className="video-list">
                            <div className="CV-remove-btn">
                                <button>< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button onClick={() => playVideo(vd)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="CV-vd-content-container">
                                <VideoPlayer className="CV-vd-content"
                                    src={vd.videoContent_link}
                                    poster={vd.thumbnailImage_link}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="CV-vd-info">
                                <div className="CV-vd-name">{vd.videoName}</div>
                                <div className="CV-vd-channel">{vd.channel_id.channelName}</div>
                                <div className="CV-vd-views-time"><span>300K</span><span> • </span><span>6 Years ago</span></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </li>
            );
        })
    }

    if (isLoading) {
        return (
            <>
                <div className="CV-vd-container">
                    <div className="CV-header">
                        <div className="title">Your uploaded videos</div>
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
        return channelVideo.length > 0 ? (
            <>
                <div className="CV-container">
                    <div className="CV-vd-container">
                        <div className="CV-header">
                            <div className="title">Your uploaded videos</div>
                        </div>
                        <div className="clear"></div>
                        <div>
                            <table>
                                <tbody className="vd-video">{renderChannelVideo()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="CV-vd-container">
                    <div className="CV-header">
                        <div className="title">Your uploaded videos</div>
                    </div>
                    <div className="no-channel-video"><h3>No Videos yet</h3></div>
                </div>
            </>
        );
    }
}

export default Content;