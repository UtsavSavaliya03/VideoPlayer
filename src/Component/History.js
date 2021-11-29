import React from 'react';
import './Css/History.css';
import VideoPlayer from 'react-video-js-player';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/RakulPreet.jpg';
import ApiCall from '../ServiceManager/apiCall';
import Loader from '../ServiceManager/Loader';
import { MdDeleteForever, MdOutlinePlayCircleFilled } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall();

class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: [],
            isLoading: false
        }
    }

    async componentDidMount() {

        this.setState({ isLoading: true })

        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id
        }
        const history = await apiCall.postAPI('http://localhost:3000/getHistory', parameter);

        this.setState({ isLoading: false })

        if (history.status) {
            this.setState({ history: history.data });
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
    }

    displayAlert = (type, alertMsg) => {
        if (type === true) {
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
        await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

        this.routeChange('/playVideo');
    }

    removeHistory = async (videoId) => {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id,
            video_id: videoId
        }
        const history = await apiCall.postAPI('http://localhost:3000/removeHistory', parameter);

        this.displayAlert(history.status, history.msg);

        if (history.status) {
            window.location.reload();
        }
    }

    removeAllHistory = async () => {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id
        }
        const history = await apiCall.postAPI('http://localhost:3000/removeAllHistory', parameter);

        this.displayAlert(history.status, history.msg);

        if (history.status) {
            window.location.reload();
        }
    }

    renderHistorr = () => {
        return this.state.history.map(vd => {
            return (
                <tr key={vd._id}>
                    <td className="H-vd-queue">
                        <div className="video-list">
                            <div className="H-remove-btn">
                                <button onClick={() => this.removeHistory(vd.video_id)} >< MdDeleteForever className="delete-btn" /><span className="tooltip-text" >Remove</span></button>
                                <button  onClick={() => this.playVideo(vd.video_id)} >< MdOutlinePlayCircleFilled className="play-btn" /><span className="tooltip-text" >Play</span></button>
                            </div>
                            <div className="H-vd-content-container">
                                <VideoPlayer className="H-vd-content"
                                    src={Video}
                                    poster={Cover}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="H-vd-info">
                                <div className="H-history-date">{vd.createDate.substr(0, 10)}</div>
                                <div className="H-vd-name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quae enim amet reiciendis illo, modi tenetur fugiat exercitationem soluta ipsa, quo laudantium nobis dolore harum saepe corporis distinctio! Pariatur, eum!</div>
                                <div className="H-vd-channel">Sony music</div>
                                <div className="H-vd-views-time"><span>300K</span><span> • </span><span>6 Years ago</span></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </td>
                </tr>
            );
        })
    }

    render() {

        const { history, isLoading } = this.state;

        if (isLoading) {
            return (
                <>
                    <div className="H-vd-container">
                        <div className="H-header">
                            <div className="title">Your History</div>
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
            return history.length > 0
                ? (
                    <>
                        <div className="H-container">
                            <div className="H-vd-container">
                                <div className="H-header">
                                    <div className="title">Your History</div>
                                    <div className="H-clear-btn"><button onClick={() => this.removeAllHistory()} >Clear all history</button></div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <div>
                                        <div className="vd-video">{this.renderHistorr()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                ) : (
                    <>
                        <div className="H-vd-container">
                            <div className="H-header">
                                <div className="title">Your History</div>
                            </div>
                            <div className="no-history"><h3>No History</h3></div>
                        </div>
                    </>
                );
        }
    }

}

export default History;
