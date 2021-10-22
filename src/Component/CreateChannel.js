import './Css/CreateChannel.css';
import channelLogo from '../assets/Images/user.png';
import React, { useState } from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

function channelHandler() {
    console.log("called");
}

export default function CreateChannel({ setOpenChannel }) {

    const [channelName, setChannelName] = useState(null);
    const [channelBio, setChannelBio] = useState(null);

    function displayAlert(type, alertMsg) {
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

    async function channelHandler() {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id,
            channelName: channelName,
            channelBio: channelBio
        }

        const data = await apiCall.postAPI('http://localhost:3000/createChannel', parameter);
        console.log(data);

        displayAlert(data.status, data.msg);

        if (data.status) {
            setOpenChannel(false);
        }
    }

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <h3 className="px-5 pt-3">How you will appear</h3><hr />
                    <div className="channel-logo">
                        <img src={channelLogo} alt="Channel Logo" />
                    </div>
                    <form>
                        <div class="form-group">
                            <label>Name :</label>
                            <input
                                type="text"
                                name="channelName"
                                class="form-control"
                                onChange={(event) => { setChannelName(event.currentTarget.value) }}
                                placeholder="Channel's Name"
                            />
                        </div>
                        <div class="form-group">
                            <label>Bio :</label>
                            <textarea
                                name="channelBio"
                                class="form-control"
                                onChange={(event) => { setChannelBio(event.currentTarget.value) }} 
                                placeholder="Add Bio..." >
                            </textarea>
                        </div>
                    </form> <hr />
                    <div className="btn-container px-5 pb-3">
                        <button className="cancel-btn" type="button" onClick={() => { setOpenChannel(false); }} >CANCEL</button>
                        <button className="create-btn" type="button" onClick={() => { channelHandler() }} >CREATE CHANNEL</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
