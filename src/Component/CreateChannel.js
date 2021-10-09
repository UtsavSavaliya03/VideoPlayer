import './Css/CreateChannel.css';
import channelLogo from '../assets/Images/user.png';
import React from 'react';

export default function CreateChannel({ setOpenChannel }) {
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
                            <label for="exampleInputEmail1">Name :</label>
                            <input type="text" class="form-control" placeholder="Channel's Name" />
                        </div>
                    </form> <hr />
                    <div className="btn-container px-5 pb-3">
                        <button className="cancel-btn" type="button" onClick={()=>{setOpenChannel(false);}} >CANCEL</button>
                        <button className="create-btn" type="button" >CREATE CHANNEL</button>
                    </div>
                </div>
            </div>
        </>
    )
}
