import './Css/form.css';
import React from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall();

class SendMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            emailError: null,
            emailValid: false
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
    }

    displayAlert = (type, alertMsg) => {
        if (type === true) {
            toast.success(alertMsg, {
                position: "top-center"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-center"
            })
        }
    }

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: [value] }, () => { this.validation(name, value) });
    }

    validation = (feildName, value) => {
        let emailError = this.state.emailError;
        let emailValid = this.state.emailValid;

        switch (feildName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailError = emailValid ? '' : 'Invalid Email...!';
                break;
            default:
                break;
        }

        this.setState({
            emailError: emailError,
            emailValid: emailValid
        });
    }

    sendEmail = async () => {
        const parameter = {
            email: this.state.email[0]
        }
        
        //-----------------------------------------------------------------------------
        localStorage.setItem('email', this.state.email)
        //-----------------------------------------------------------------------------

        const data = await apiCall.postAPI('http://localhost:3000/sendEmail', parameter);
        console.log(data);

        this.displayAlert(data.status, data.msg);

        if (data.status) {
            this.routeChange('/resetPassword');
        }
    }

    render() {
        return (
            <>
                <div className="login-container">
                    <div className="form-container">
                        <h2 className="px-5 pt-5">Send Recovery Mail</h2>
                        <form className="p-5">
                            <div className="form-group">
                                <p className="validation-error" >{this.state.emailError}</p>
                                <input type="email" name="email" className="form-control" onChange={this.getValue} placeholder="Email" />
                            </div>
                            <button type="button" className="btn btn-primary d-block my-4 mx-auto" onClick={this.sendEmail} disabled={!this.state.emailValid} >Send</button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </>
        )
    }
}

export default SendMail;
