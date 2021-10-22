import './Css/UserProfile.css';
import React from 'react';
import Avatar, { ConfigProvider } from 'react-avatar';
import image from '../assets/Video/VideoCover/videoCover.jpg';
import addPhoto from '../assets/Icons/add_a_photo.svg';
import personIcon from '../assets/Icons/black_person.svg';

export default function UserProfile() {

    function upload() {
        const file = document.getElementById("selectImage").click()
    }

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        console.log(fileUploaded.name);
    };

    return (
        <>
            <div className="profile-container">
                <div className="img-frame">
                    <div className="overlay">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="title">Hello Utsav</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="data-container">
                    <div className="head">
                        <div className="profile">
                            <Avatar className="user-profile" onClick={() => { upload() }} unstyled={true} src={image} />
                            <input id='selectImage' hidden type="file" onChange={handleChange} />
                        </div>
                        <div className="account">
                            <h3><span><img className="personIcon" src={personIcon} alt="person icon" /></span>My Account</h3>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <form>
                        <div className="user-info">
                            <div className="title"><p>USER INFORMATION</p></div>
                            <div className="row">
                                <div class="form-group col-6">
                                    <label>Username :</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        class="form-control"
                                        placeholder="Username"
                                    />
                                </div>
                                <div class="form-group col-6">
                                    <label>Email Address :</label>
                                    <input
                                        type="email"
                                        name="email"
                                        class="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col-6">
                                    <label>First Name :</label>
                                    <input
                                        type="text"
                                        name="fName"
                                        class="form-control"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div class="form-group col-6">
                                    <label>Last Name :</label>
                                    <input
                                        type="text"
                                        name="lName"
                                        class="form-control"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="title"><p>CONTACT INFORMATION</p></div>
                            <div className="row">
                                <div class="form-group col-6">
                                    <label>Contact :</label>
                                    <input
                                        type="number"
                                        name="contactNum"
                                        class="form-control"
                                        placeholder="Contact Number"
                                    />
                                </div>
                                <div class="form-group col-6">
                                    <label>Country :</label>
                                    <input
                                        type="text"
                                        name="country"
                                        class="form-control"
                                        placeholder="Country"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Address :</label>
                                <input
                                    type="text"
                                    name="address"
                                    class="form-control"
                                    placeholder="Address"
                                />
                            </div>
                            <button type="button" className="btn btn-primary mx-auto mt-4 d-block">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
