import './Css/UserProfile.css';
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import personIcon from '../assets/Icons/black_person.svg';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Loader from '../ServiceManager/Loader';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

function UserProfile() {

    const [cookies, setCookie] = useCookies(["user"]);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [contact, setContact] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [file, setFile] = useState(null);

    useEffect(async () => {

        setProfilePicture(user.profile_picture);
        setUserName(user.userName);
        setEmail(user.email);
        setFName(user.fName);
        setLName(user.lName);
        setContact(user.contact);
        setCountry(user.country);
        setAddress(user.address);

    }, [user])

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

    async function updateHandler() {

        if (contact === undefined || country === undefined || address === undefined) {
            return (
                displayAlert(false, "Please enter contact information...!")
            );
        }

        setIsLoading(true);

        let formData = new FormData();

        formData.append("user_id", user.user_id);
        formData.append("file", file);
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("fName", fName);
        formData.append("lName", lName);
        formData.append("contact", contact);
        formData.append("country", country);
        formData.append("address", address);

        const data = await axios.post('http://localhost:3000/updateProfile', formData)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            });

        console.log(data.data);
        displayAlert(data.status, data.msg);
        setIsLoading(false);

        if (data.status) {
            setCookie("user", data.data, { path: '/' });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    function upload() {
        document.getElementById("selectImage").click()
    }

    if (isLoading) {
        return (
            <>
                <div className="user-profile">
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
        return (
            <>
                <div className="profile-container">
                    <div className="img-frame">
                        <div className="overlay">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1 className="title">Hello {fName}...</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="data-container">
                        <div className="head">
                            <div className="profile">
                                <Avatar className="user-profile" onClick={() => upload()} unstyled={true} src={profilePicture} name={fName + ' ' + lName} />
                                <input
                                    id="selectImage"
                                    accept="image/*"
                                    hidden
                                    type="file"
                                    onChange={(event) => setFile(event.target.files[0])}
                                />
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
                                    <div className="form-group col-6">
                                        <label>Username :</label>
                                        <input
                                            type="text"
                                            name="userName"
                                            className="form-control"
                                            value={userName}
                                            onChange={(e) => { setUserName(e.target.value) }}
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Email Address :</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>First Name :</label>
                                        <input
                                            type="text"
                                            name="fName"
                                            className="form-control"
                                            value={fName}
                                            onChange={(e) => { setFName(e.target.value) }}
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Last Name :</label>
                                        <input
                                            type="text"
                                            name="lName"
                                            className="form-control"
                                            value={lName}
                                            onChange={(e) => { setLName(e.target.value) }}
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="title"><p>CONTACT INFORMATION</p></div>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>Contact :</label>
                                        <input
                                            type="number"
                                            name="contact"
                                            className="form-control"
                                            value={contact}
                                            onChange={(e) => { setContact(e.target.value) }}
                                            placeholder="Contact Number"
                                        />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Country :</label>
                                        <input
                                            type="text"
                                            name="country"
                                            className="form-control"
                                            value={country}
                                            onChange={(e) => { setCountry(e.target.value) }}
                                            placeholder="Country"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Address :</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        placeholder="Address"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary mx-auto mt-4 d-block"
                                    onClick={() => updateHandler()}>
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