import './Css/UserProfile.css';
import React, { useState, useEffect, Component } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import addPhoto from '../assets/Icons/add_a_photo.svg';
import personIcon from '../assets/Icons/black_person.svg';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

class UserProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            profilePicture: '',
            profilePicture: '',
            userName: '',
            email: '',
            fName: '',
            lName: '',
            contact: '',
            country: '',
            address: '',
            file: ''
        }
    }

    async componentDidMount() {
        const user_id = localStorage.getItem('user_id');
        const parameter = {
            user_id: user_id
        }
        const data = await apiCall.postAPI('http://localhost:3000/getUser', parameter);
        console.log(data);
        if (data.status) {
            this.setState({
                profilePicture: data.data.profile_picture,
                userName: data.data.userName,
                email: data.data.email,
                fName: data.data.fName,
                lName: data.data.lName,
                contact: data.data.contact,
                country: data.data.country,
                address: data.data.address
            })
        }
    }

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
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

    updateHandler = async () => {

        const user_id = localStorage.getItem('user_id');
        let formData = new FormData();

        formData.append("user_id", user_id);
        formData.append("file", this.state.file);
        formData.append("userName", this.state.userName);
        formData.append("email", this.state.email);
        formData.append("fName", this.state.fName);
        formData.append("lName", this.state.lName);
        formData.append("contact", this.state.contact);
        formData.append("country", this.state.country);
        formData.append("address", this.state.address);

        const data = await axios.post('http://localhost:3000/updateProfile', formData)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            });

        console.log(data);
        this.displayAlert(data.status, data.msg);

        if (data.status) {
            window.location.reload();
        }
    }

    upload = () => {
        document.getElementById("selectImage").click()
    }

    render() {
        console.log(this.state.profilePicture);
        console.log(this.state.file);
        return (
            <>
                <div className="profile-container">
                    <div className="img-frame">
                        <div className="overlay">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1 className="title">Hello {this.state.fName}...</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="data-container">
                        <div className="head">
                            <div className="profile">
                                {/* <form encType="multipart/form-data"> */}
                                <Avatar className="user-profile" onClick={this.upload} unstyled={true} src={this.state.profilePicture} name={this.state.fName + ' ' + this.state.lName} />
                                <input
                                    id="selectImage"
                                    accept="image/*"
                                    hidden
                                    type="file"
                                    onChange={(event) => { this.setState({ file: event.target.files[0] }) }}
                                />
                                {/* </form> */}
                            </div>
                            <div className="account">
                                <h3><span><img className="personIcon" src={personIcon} alt="person icon" /></span>My Account</h3>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <form className="user-details">
                            <div className="user-info">
                                <div className="title"><p>USER INFORMATION</p></div>
                                <div className="row">
                                    <div class="form-group col-6">
                                        <label>Username :</label>
                                        <input
                                            type="text"
                                            name="userName"
                                            className="form-control"
                                            value={this.state.userName}
                                            onChange={this.getValue}
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div class="form-group col-6">
                                        <label>Email Address :</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.getValue}
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
                                            className="form-control"
                                            value={this.state.fName}
                                            onChange={this.getValue}
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div class="form-group col-6">
                                        <label>Last Name :</label>
                                        <input
                                            type="text"
                                            name="lName"
                                            className="form-control"
                                            value={this.state.lName}
                                            onChange={this.getValue}
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
                                            name="contact"
                                            className="form-control"
                                            value={this.state.contact}
                                            onChange={this.getValue}
                                            placeholder="Contact Number"
                                        />
                                    </div>
                                    <div class="form-group col-6">
                                        <label>Country :</label>
                                        <input
                                            type="text"
                                            name="country"
                                            className="form-control"
                                            value={this.state.country}
                                            onChange={this.getValue}
                                            placeholder="Country"
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Address :</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={this.getValue}
                                        placeholder="Address"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary mx-auto mt-4 d-block"
                                    onClick={this.updateHandler}>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default UserProfile;
