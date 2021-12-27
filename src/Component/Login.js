import './Css/form.css';
import React, { useState } from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

/* -------------- BackGround images ----------------- */
import img1 from '../assets/Images/cameraBg.png'

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';


let apiCall = new ApiCall;

export default function Login(props) {

    const [cookies, setCookie] = useCookies("user", "channel", "isLogin");
    const [userOrEmail, setUserOrEmail] = useState('');
    const [password, setPassword] = useState('');

    function routeChange(path) {
        props.history.push(path);
    }

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

    async function loginHandler() {
        const parameter = {
            userName: userOrEmail,
            email: userOrEmail,
            password: password
        }

        const data = await apiCall.postAPI('http://localhost:3000/login', parameter);
        console.log(data);

        displayAlert(data.status, data.msg)

        if (data.status) {
            setCookie("isLogin", true, { path: '/' });
            setCookie("user", data.data.user[0], { path: '/' });

            const parameter = {
                user_id: data.data.user[0]._id,
            }

            const channel = await apiCall.postAPI('http://localhost:3000/getUserChannel', parameter);
            console.log(channel);
            if (channel.status) {
                setCookie("channel", channel.data, { path: '/' });
            }

            routeChange('/');
            window.location.reload();
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row pt-5">
                    <div className="offset-md-7 col-md-4 mt-5">
                        <h1 className="px-5 pt-5 text-primary">Login</h1>
                        <form className="p-5">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="w-100 p-2"
                                    name="userOrEmail"
                                    onChange={(e) => { setUserOrEmail(e.target.value) }}
                                    placeholder="Email or Username"
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="w-100 p-2"
                                    name="password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    placeholder="Password"
                                    autocomplete="off"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary d-block mt-5 mb-4 mx-auto"
                                onClick={() => loginHandler()}
                                disabled={userOrEmail.length < 1}
                            >
                                Login
                            </button>
                            <div className="my-4">
                                <div className="float-left">
                                    <a href="/sendMail">forgot password ?</a>
                                </div>
                                <div className="float-right">
                                    <a href="/signup">signup</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
