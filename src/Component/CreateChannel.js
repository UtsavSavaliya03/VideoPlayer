import './Css/CreateChannel.css';
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';

function CreateChannel() {

    const history = useHistory();

    const [cookies, setCookie] = useCookies("channel");
    const user = useSelector((state) => state.user);

    const [file, setFile] = useState(null);
    const [channelName, setChannelName] = useState(null);
    const [email, setEmail] = useState(null);
    const [channelBio, setChannelBio] = useState(null);

    function routeChange(path) {
        history.push(path);
    }

    function displayAlert(type, alertMsg) {
        if (type == true) {
            toast.success(alertMsg, {
                position: "top-right"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-right"
            })
        }
    }

    async function channelHandler() {

        let formData = new FormData();

        formData.append("user_id", user._id);
        formData.append("file", file);
        formData.append("channelName", channelName);
        formData.append("email", email);
        formData.append("channelBio", channelBio);

        const data = await axios.post('https://video-player-api-demo.herokuapp.com/createChannel', formData)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            });

        if (data.status) {
            setCookie("channel", data.data, { path: '/' });
            routeChange('/studio');
        }

        displayAlert(data.status, data.msg);
    }

    function maxSelectFile(event) {
        let files = event.target.files;
        if (files.length > 1) {
            toast.error('Maximum 1 file is allowed...!');
            event.target.value = null;
            return false;
        } else {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 1000000) { // 1 MB
                    displayAlert(false, "Fiel must be less then 1 Mb...!")
                }
            }
        }
        return true;
    }

    function fileChangeHandler(event) {
        const file = event.target.files[0];
        if (file != null) {
            if (maxSelectFile(event)) {
                setFile(file);
            }
        }
    }

    function uploadImage() {
        document.getElementById("channel_profile").click()
    }

    return (
        <>
            <div className="container-fluid">
                <div className="px-md-5 mx-md-5">
                    <h3 className="pt-5">How you will appear</h3><hr className='pb-4' />
                    <div className="row">
                        <div className="channel-logo col-12 col-md-4">
                            <Avatar
                                className="channel-avatar d-block m-auto"
                                src={user.profile_picture}
                                round={true}
                                size='200'
                                name={channelName}
                            />
                            <input
                                hidden
                                type="file"
                                id="channel_profile"
                                accept="image/*"
                                onChange={(event) => fileChangeHandler(event)}
                            />
                            <button className="profile-btn d-block m-auto" type="button" onClick={() => uploadImage()} >CHANGE PROFILE</button>
                        </div>
                        <div className="create-channel-data col-12 col-md-8 mt-5 mt-md-3">
                            <form autocomplete="off">
                                <div className="row">
                                    <div class="form-group col-12 col-md-6">
                                        <input
                                            type="text"
                                            name="channelName"
                                            class="input"
                                            onChange={(event) => { setChannelName(event.currentTarget.value) }}
                                            placeholder="Channel Name"
                                        />
                                    </div>
                                    <div class="form-group col-12 col-md-6">
                                        <input
                                            type="text"
                                            name="email"
                                            class="input"
                                            onChange={(event) => { setEmail(event.currentTarget.value) }}
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <textarea
                                        name="channelBio"
                                        class="textarea"
                                        rows="10"
                                        onChange={(event) => { setChannelBio(event.currentTarget.value) }}
                                        placeholder="Add Channel Bio..." >
                                    </textarea>
                                </div>
                            </form>
                        </div>
                    </div><hr className="mt-4" />
                    <div className="btn-container my-4">
                        <button className="cancel-btn ml-4" type="button" onClick={() => { history.goBack() }} >CANCEL</button>
                        <button className="create-btn ml-4" type="button" onClick={() => { channelHandler() }} disabled={channelName == null || email == null} >CREATE CHANNEL</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default CreateChannel;
