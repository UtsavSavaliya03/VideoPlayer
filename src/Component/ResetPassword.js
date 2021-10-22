import './Css/form.css';
import React from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            password: '',
            confirmPass: '',
            passwordError: '',
            confirmPassError: '',
            passwordValid: false,
            confirmPassValid: false
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
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

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: [value] }, () => { this.validation(name, value) });
    }

    validation = (feildName, value) => {
        let passwordError = this.state.passwordError;
        let passwordValid = this.state.passwordValid;
        let confirmPassError = this.state.confirmPassError;
        let confirmPassValid = this.state.confirmPassValid;

        switch (feildName) {
            case 'password':
                passwordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                passwordError = passwordValid ? '' : 'Password is too weak...!';
                break;
            case 'confirmPass':
                if (value == this.state.password) {
                    confirmPassError = '';
                    confirmPassValid = true;
                } else {
                    confirmPassError = 'Please enter same Password...!';
                }
                break;
            default:
                break;
        }

        this.setState({
            passwordError: passwordError,
            passwordValid: passwordValid,
            confirmPassError: confirmPassError,
            confirmPassValid: confirmPassValid
        });
    }

    ResetPassword = async () => {

        //-----------------------------------------------------------------------------
        const email =  localStorage.getItem('email');
        //-----------------------------------------------------------------------------
        
        const parameter = {
            email: email,
            otpCode: this.state.otp[0],
            password: this.state.password[0],
            confirmPass: this.state.confirmPass[0]
        }
        console.log(this.state.password[0]);
        console.log(this.state.confirmPass[0]);
        console.log(this.state.otp[0]);
        const data = await apiCall.postAPI('http://localhost:3000/resetPassword', parameter);
        console.log(data);

        this.displayAlert(data.status, data.msg);

        if (data.status) {
            this.routeChange('/login');
        }
    }

    render() {
        return (
            <>
                <div className="login-container">
                    <div className="form-container">
                        <h1 className="px-5 pt-5">Reset Password</h1>
                        <form className="p-5">
                            <div className="form-group">
                                <input type="number" name="otp" className="form-control" onChange={this.getValue} placeholder="Otp" />
                            </div>
                            <div className="form-group">
                                <p className="validation-error" >{this.state.passwordError}</p>
                                <input type="password" name="password" className="form-control" onChange={this.getValue} placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <p className="validation-error" >{this.state.confirmPassError}</p>
                                <input type="password" name="confirmPass" className="form-control" onChange={this.getValue} placeholder="Confirm Password" />
                            </div>
                            <button type="button" className="btn btn-primary d-block my-4 mx-auto" onClick={this.ResetPassword} disabled={!this.state.passwordValid || !this.state.confirmPassValid} >Reset Password</button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </>
        )
    }
}

export default ResetPassword;
