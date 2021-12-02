import React, { useState } from 'react'
import './Css/VideoPlay.css';
import VideoPlayer from 'react-video-js-player';
import Avatar from 'react-avatar';
import ApiCall from '../ServiceManager/apiCall';
import { AiFillLike, AiFillHeart } from 'react-icons/ai';
import { MdWatchLater } from 'react-icons/md';
import Video from '../assets/Video/Video.mp4';
import Cover from '../assets/Video/VideoCover/RakulPreet.jpg';
import { ToastContainer, toast } from 'react-toastify';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

class VideoPlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentVideo: '',
            userComment: '',
            videoComments: '',
            video: Video,
            cover: Cover,
            arr: [{ "_id": "11", "name": "Love me thoda aur | Rakul Preat Singh kohli kohli kohli kohli kohli", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "12", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "13", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "04", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "15", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "16", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "17", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "18", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }, { "_id": "19", "name": "Love me thoda aur | Rakul Preat Singh", "channel_name": "Sony music", "views": "300K", "time_line": "6 Years ago" }],
            cmt: [{ "_id": "0131", "userName": "Test123", "cmt_text": "Nice content brother. Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother.Nice content brother." }, { "_id": "0213222", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "01213", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "012135", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "015134", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "05923", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "0936", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "07", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "84608", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "09465", "userName": "Test123", "cmt_text": "Nice content brother." }, { "_id": "104651", "userName": "Test123", "cmt_text": "Nice content brother." }]
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

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    playVideo = async (videoDetails) => {

        const user_id = localStorage.getItem('user_id');

        if (user_id != null) {
            const parameter = {
                user_id: user_id,
                video_id: videoDetails._id
            }
            const history = await apiCall.postAPI('http://localhost:3000/addHistory', parameter);

            console.log(history);
        }
        console.log("Changed");
        this.setState({ currentVideo: videoDetails })
        this.routeChange('/playVideo');
        // window.location.reload();
    }

    addFavourite = async () => {
        // const user_id = localStorage.getItem('user_id');
        // const video_id = ;

        // const parameter = {
        //     user_id: user_id,
        //     video_id: video_id
        // }
        // const favourite = await apiCall.postAPI('http://localhost:3000/addFavourite', parameter);

        // this.displayAlert(favourite.status, favourite.msg);
    }

    addWatchLater = async () => {
        alert("123456789")
    }

    postComment = async () => {
        const user_id = localStorage.getItem('user_id');
        if (user_id != null) {
            const parameter = {
                user_id: user_id,
                cmt_text: this.state.userComment,
            }
            const comment = await apiCall.postAPI('http://localhost:3000/postComment', parameter);

            if (comment.status) {
                this.setState({ userComment: '' })
            }
        }
    }

    renderTableRows = () => {
        return this.state.arr.map(vd => {
            return (
                <tr key={vd._id}>
                    <td className="vd-queue">
                        <button onClick={() => { this.playVideo("03") }} >
                            <div className="vd-content-container">
                                <VideoPlayer className="vd-content"
                                    src={this.state.video}
                                    poster={this.state.cover}
                                    bigPlayButton={false}
                                    controls={false}
                                />
                            </div>
                            <div className="vd-info">
                                <div className="vd-name">{vd.name}</div>
                                <div className="vd-channel">{vd.channel_name}</div>
                                <div className="vd-views-time"><span>{vd.views}</span><span> • </span><span>{vd.time_line}</span></div>
                            </div>
                            <div className="clear"></div>
                        </button>
                    </td>
                </tr>
            );
        })
    }

    renderComment = () => {
        if (this.state.videoComments.length > 0) {
            return this.state.cmt.map((cmt) => {
                return (
                    <tr key={cmt._id}>
                        <div className="user-comment">
                            <div className="user-profile">
                                <Avatar className="user-profile-cmt" round size="45" name={cmt.userName} />
                            </div>
                            <div className="user-info">
                                <p className="name">{cmt.userName}</p>
                                <p className="comment">{cmt.cmt_text}</p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </tr>
                );
            });
        } else {
            return (
                <>
                    <div className="no-comment" ><h3>No Comments</h3></div>
                </>
            )
        }
    }

    render() {
        console.log("Current Video",this.state.currentVideo);
        return (
            <>
                <div>
                    <div className="video-container">
                        <div className="vd-playing-cotainer">
                            <VideoPlayer className="vd-playing"
                                src={this.state.video}
                                poster={this.state.cover}
                                bigPlayButton={false}
                            // autoplay={true}
                            />
                            <div className="video-details">
                                <div className="vd-name">
                                    <p>Love me thoda aur | Rakul Preat Singh</p>
                                </div>
                                <div className="vd-view-time">
                                    <span>300K</span><span> • </span><span>6 Years ago</span>
                                </div>
                                <div className="btn-container">
                                    <button><AiFillLike className="like-btn" /><span className="tooltip-text" >Like</span></button>
                                    <button><AiFillHeart onClick={this.addFavourite} className="favourite-btn" /><span className="tooltip-text" >Favourite</span></button>
                                    <button><MdWatchLater onClick={this.addWatchLater} className="watch-later-btn" /><span className="tooltip-text" >Watch Later</span></button>
                                </div>
                                <div className="clear"></div>
                            </div><hr className="hr" />
                            <div className="channel">
                                <div className="logo">
                                    <Avatar className="channel-profile" round size="50" name={"Sony Music"} />
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
                            <div className="add-comment">
                                <div className="user-profile">
                                    <Avatar className="user-profile-cmt" round size="45" name={"userName"} />
                                </div>
                                <div className="user-info">
                                    <input
                                        className="cmt-input"
                                        type="text"
                                        name="userComment"
                                        value={this.state.userComment}
                                        placeholder="Commenting as Utsav Savaliya"
                                        onChange={(e) => { this.setState({ userComment: e.target.value }) }}
                                    />
                                    {this.state.userComment.length > 0 && <button className="add-cmt-btn" onClick={() => { this.postComment() }} >COMMENT</button>}
                                </div>
                                <div className="clear"></div>
                            </div><hr />
                            <div className="comment-container">{this.renderComment()}</div>
                        </div>
                        <div className="vd-list-container">
                            <div>
                                <table>
                                    <tbody className="vd-video">{this.renderTableRows()}</tbody>
                                </table>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default VideoPlay;
