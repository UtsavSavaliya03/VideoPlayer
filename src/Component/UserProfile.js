import './Css/UserProfile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Loader from '../ServiceManager/Loader';
import userIcon from '../assets/Images/user.jpg';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

function UserProfile() {

    const [cookies, setCookie] = useCookies(["user"]);
    const user = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState(userIcon);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [contact, setContact] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [file, setFile] = useState(null);

    useEffect(async () => {
        if (user.profile_picture != undefined) {
            setProfilePicture(user.profile_picture);
        }
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
                position: "top-right"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-right"
            })
        }
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


    async function updateHandler() {

        if (contact === undefined || country === undefined || address === undefined) {
            return (
                displayAlert(false, "Please enter contact information...!")
            );
        }

        setIsLoading(true);

        let formData = new FormData();

        formData.append("file", file);
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("fName", fName);
        formData.append("lName", lName);
        formData.append("contact", contact);
        formData.append("country", country);
        formData.append("address", address);

        const url = `http://localhost:3000/updateProfile/${user._id}`

        const data = await axios.post(url, formData)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            });

        displayAlert(data.status, data.msg);

        if (data.status) {

            const url = `http://localhost:3000/getUser/${user._id}`

            setTimeout(async () => {
                const updatedUser = await apiCall.postAPI(url);
                // console.log(updatedUser);

                if (updatedUser.status) {
                    setCookie("user", updatedUser.data, { path: '/' });
                    setIsLoading(false);
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }, 3000);
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
                        <div className="text-center text-muted"><h3>Loading...</h3></div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="container-fluid p-0">
                    <div className="user-img-frame">
                        <div className="overlay">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 py-5">
                                        <h1 className="mt-5 text-white font-weight-bold">Hello {fName}...</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-lg-5 px-lg-5'>
                        <div className="data-container mx-4 mx-md-5">
                            <div className="head row mb-5">
                                <div className="col-12 col-md-5">
                                    <div className="camera-cover">
                                        <div className='user-profile-img'>
                                            <img
                                                onClick={() => { upload() }}
                                                src={profilePicture}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        id="selectImage"
                                        accept="image/*"
                                        hidden
                                        type="file"
                                        onChange={(event) => fileChangeHandler(event)}
                                    />
                                </div>
                                <div className="col-12 col-md-7">
                                    <h3 className='text-center mt-5'><i class="fad fa-user-edit mr-2"></i>Edit Account</h3>
                                </div>
                            </div>
                            <form className="user-details mx-lg-5">
                                <div className="row py-5 px-4 mx-md-5 p-lg-5 d-block">
                                    <div className="text-muted font-weight-bold"><p>USER INFORMATION</p></div>
                                    <div className="row">
                                        <div className="form-group col-md-6 col-12">
                                            <label>Username :</label>
                                            <input
                                                type="text"
                                                name="userName"
                                                className="w-100 p-2"
                                                value={userName}
                                                onChange={(e) => { setUserName(e.target.value) }}
                                                placeholder="Username"
                                            />
                                        </div>
                                        <div className="form-group col-md-6 col-12">
                                            <label>Email Address :</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="w-100 p-2"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                placeholder="Email"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 col-12">
                                            <label>First Name :</label>
                                            <input
                                                type="text"
                                                name="fName"
                                                className="w-100 p-2"
                                                value={fName}
                                                onChange={(e) => { setFName(e.target.value) }}
                                                placeholder="First Name"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group col-md-6 col-12">
                                            <label>Last Name :</label>
                                            <input
                                                type="text"
                                                name="lName"
                                                className="w-100 p-2"
                                                value={lName}
                                                onChange={(e) => { setLName(e.target.value) }}
                                                placeholder="Last Name"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="text-muted font-weight-bold"><p>CONTACT INFORMATION</p></div>
                                    <div className="row">
                                        <div className="form-group col-md-6 col-12">
                                            <label>Contact :</label>
                                            <input
                                                type="number"
                                                name="contact"
                                                className="w-100 p-2"
                                                value={contact}
                                                onChange={(e) => { setContact(e.target.value) }}
                                                placeholder="Contact Number"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group col-md-6 col-12">
                                            <label>Country :</label>
                                            <input
                                                type="text"
                                                name="country"
                                                className="w-100 p-2"
                                                value={country}
                                                onChange={(e) => { setCountry(e.target.value) }}
                                                placeholder="Country"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Address :</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="w-100 p-2"
                                            value={address}
                                            onChange={(e) => { setAddress(e.target.value) }}
                                            placeholder="Address"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary mx-auto mt-5 d-block"
                                        onClick={() => updateHandler()}>
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}
export default UserProfile;