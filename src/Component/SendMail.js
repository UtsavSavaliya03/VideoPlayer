import './Css/form.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall();

export default function SendMail() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    function routeChange(path) {
        history.push(path);
    }

    function displayAlert(type, alertMsg) {
        if (type === true) {
            toast.success(alertMsg, {
                position: "top-right"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-right"
            })
        }
    }

    function validate(name, fieldValue) {
        switch (name) {
            case 'email':
                const emailValid = fieldValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                setEmailError(emailValid ? null : 'Enter valid email...!');
                if (emailValid) {
                    setEmail(fieldValue);
                }
                break;
        }
    }

    async function sendEmail() {
        const parameter = {
            email: email
        }

        const data = await apiCall.postAPI('http://localhost:3000/sendEmail', parameter);
        displayAlert(data.status, data.msg);

        if (data.status) {
            //-----------------------------------------------------------------------------
            localStorage.setItem('email', email)
            //-----------------------------------------------------------------------------
            routeChange('/resetPassword');
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="background">
                    <div className="row pt-md-5">
                        <div className="offset-lg-7 offset-md-5 col-lg-4 col-md-7 mt-md-5">
                            <h2 className="px-md-5 pt-5 text-primary">Send Recovery Mail</h2>
                            <form className="p-md-5">
                                <div className="form-group">
                                    <p className="validation-error" >{emailError}</p>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-100 p-2"
                                        onChange={(e) => validate(e.target.name, e.target.value)}
                                        placeholder="Email"
                                        autoComplete="off"
                                    />
                                </div>
                                <button type="button" className="btn btn-primary d-block my-5 mx-auto" onClick={() => sendEmail()} disabled={emailError != null} >Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}