import './Css/MyChannel.css';
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useHistory, useParams } from "react-router-dom";
import Loader from '../../ServiceManager/Loader';
import ApiCall from '../../ServiceManager/apiCall';
import { useSelector } from 'react-redux';

const apiCall = new ApiCall;

function MyChannel() {

    let history = useHistory();
    let params = useParams();

    const userChannel = useSelector((state) => state.userChannel);

    const [isLoading, setIsLoading] = useState(true);
    const [channel, setChannel] = useState([]);

    useEffect(async () => {

        setIsLoading(true);

        const channelId = atob(params.id);
        const getChannelUrl = `https://video-player-api-demo.herokuapp.com/getChannel/${channelId}`;
        const channel = await apiCall.postAPI(getChannelUrl);

        if (channel.status) {
            setIsLoading(false);
            setChannel(channel.data);
        }
    }, []);

    function routeChange(path) {
        history.push(path);
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
                <div className="container-fluid p-0">
                    <div className="img-frame">
                        <div className="overlay">
                        </div>
                    </div>
                    <div className="px-md-5 mx-lg-5">
                        <div className="channel-data mx-3 mx-md-5">
                            <div className="row">
                                <div className="profile col-md-6">
                                    <Avatar className="channel-profile" src={channel.channel_profile} unstyled={true} name={channel.channelName} />
                                    <h2 className="text-center my-3">{channel.channelName}</h2>
                                </div>
                                <div className="col-md-6 align-self-center text-center mx-auto">
                                    {(userChannel._id === atob(params.id)) &&
                                        <button onClick={() => { routeChange(`/studio/updateChannel/${btoa(userChannel._id)}`) }} className="btn btn-outline-primary" >Customize</button>
                                    }
                                </div>
                            </div>
                            <div className="m-5 p-4">
                                <div>
                                    <p className="title"><b>ABOUT CHANNEL</b></p>
                                    <p className='text-muted'>{channel.channelBio}</p>
                                </div>
                                <div className="my-5">
                                    <p className="title"><b>CONTACT INFORMATION</b></p>
                                    <div>
                                        <b>EMAIL :</b> <span><a target="_blank" href={`mailto: ${channel.email}`}>{channel.email}</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MyChannel
