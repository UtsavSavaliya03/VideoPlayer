import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import ApiCall from '../../ServiceManager/apiCall';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Loader from '../../ServiceManager/Loader';
import 'react-toastify/dist/ReactToastify.css';

const apiCall = new ApiCall();

export default function UpdateChannel() {

    const history = useHistory();
    const params = useParams();

    const [cookies, setCookie] = useCookies("channel");
    const userChannel = useSelector((state) => state.userChannel);

    const [isLoading, setIsLoading] = useState(false);
    const [channel_profile, setChannel_profile] = useState('');
    const [file, setFile] = useState(null);
    const [channelName, setChannelName] = useState('');
    const [email, setEmail] = useState('');
    const [channelBio, setChannelBio] = useState('');

    if (userChannel._id !== atob(params.id)) {
        routeChange('/studio');
    }

    useEffect(async () => {
        setIsLoading(true);

        const channelId = atob(params.id);
        const getChannelUrl = `https://video-player-api-demo.herokuapp.com/getChannel/${channelId}`;
        const channel = await apiCall.postAPI(getChannelUrl);

        if (channel.status) {
            setChannel_profile(channel.data.channel_profile);
            setChannelName(channel.data.channelName);
            setEmail(channel.data.email);
            setChannelBio(channel.data.channelBio);
            setIsLoading(false);
        }
    }, [0])

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

        setIsLoading(true);

        let formData = new FormData();

        formData.append("file", file);
        formData.append("channelName", channelName);
        formData.append("email", email);
        formData.append("channelBio", channelBio);

        const channelId = atob(params.id);
        const updateChannelUrl = `https://video-player-api-demo.herokuapp.com/updateChannel/${channelId}`

        const data = await axios.post(updateChannelUrl, formData)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            });

        displayAlert(data.status, data.msg);

        if (data.status) {

            setTimeout(async () => {
                const getChannelUrl = `https://video-player-api-demo.herokuapp.com/getChannel/${channelId}`;
                const channel = await apiCall.postAPI(getChannelUrl);
                if (channel.status) {
                    setCookie("channel", channel.data, { path: '/' });
                    setIsLoading(false);
                }
                routeChange(`/studio/myChannel/${params.id}`);
            }, [2000]);
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


    if (isLoading) {
        return (
            <>
                <div className="container-fluid">
                    <div className="spinner">
                        <Loader />
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="container-fluid">
                    <div className="px-md-5 mx-md-5">
                        <h3 className="pt-5"><i class="fad fa-edit mr-2"></i>Edit Channel</h3><hr className='pb-4' />
                        <div className="row">
                            <div className="channel-logo col-12 col-md-4">
                                <Avatar
                                    className="channel-avatar d-block m-auto"
                                    src={channel_profile}
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
                                                value={channelName}
                                                onChange={(event) => { setChannelName(event.currentTarget.value) }}
                                                placeholder="Channel Name"
                                            />
                                        </div>
                                        <div class="form-group col-12 col-md-6">
                                            <input
                                                type="text"
                                                name="email"
                                                class="input"
                                                value={email}
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
                                            value={channelBio}
                                            onChange={(event) => { setChannelBio(event.currentTarget.value) }}
                                            placeholder="Add Channel Bio..." >
                                        </textarea>
                                    </div>
                                </form>
                            </div>
                        </div><hr className="mt-4" />
                        <div className="btn-container my-4">
                            <button className="cancel-btn ml-4 text-uppercase" type="button" onClick={() => { history.goBack() }} >Cancel</button>
                            <button className="create-btn ml-4 text-uppercase" type="button" onClick={() => { channelHandler() }} disabled={channelName.length < 1 || email.length < 1} >Update Channel</button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}
