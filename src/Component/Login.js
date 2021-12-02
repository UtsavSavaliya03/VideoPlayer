import './Css/form.css';
import React, { useState } from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

/* ------------------ Import CSS ------------------- */
import 'react-toastify/dist/ReactToastify.css';


let apiCall = new ApiCall;

export default function Login(props) {

    const [cookies, setCookie] = useCookies("user");  
    const [loginUser, setLoginUser] = useState([]);
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
            setLoginUser(data.data.user);
            localStorage.setItem('isLogin', true);
            localStorage.setItem('user_id', data.data.user[0].user_id);
            setCookie("user", data.data.user[0], {path: '/'});
            
            const parameter = {
                user_id: data.data.user[0].user_id,
            }
            
            const channel = await apiCall.postAPI('http://localhost:3000/getUserChannel', parameter);
            console.log(channel);
            if (channel.status) {
                setCookie("channel", channel.data, {path: '/'});
            }

            routeChange('/');
            window.location.reload();
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="form-container">
                    <h1 className="px-5 pt-5">Login</h1>
                    <form className="p-5">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="userOrEmail"
                                onChange={(e) => { setUserOrEmail(e.target.value) }}
                                placeholder="Email or Username"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary d-block my-4 mx-auto"
                            onClick={() => loginHandler()}
                            disabled={userOrEmail.length < 1}
                        >
                            Login
                        </button>
                        <div className="my-4">
                            <div className="forgot-password">
                                <a href="/sendMail">forgot password ?</a>
                            </div>
                            <div className="signup">
                                <a href="/signup">signup</a>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
