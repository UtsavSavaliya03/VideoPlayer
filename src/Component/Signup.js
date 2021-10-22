import './Css/form.css';
import React from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall;

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            userName: '',
            email: '',
            password: '',
            confirmPass: '',
            emailError: '',
            passwordError: '',
            confirmPassError: '',
            emailValid: false,
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
        let emailError = this.state.emailError;
        let passwordError = this.state.passwordError;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmPassError = this.state.confirmPassError;
        let confirmPassValid = this.state.confirmPassValid;

        switch (feildName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailError = emailValid ? '' : 'Invalid Email...!';
                break;
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
            emailError: emailError,
            emailValid: emailValid,
            passwordError: passwordError,
            passwordValid: passwordValid,
            confirmPassError: confirmPassError,
            confirmPassValid: confirmPassValid
        });
    }

    signupHandler = async () => {
        const parameter = {
            fName: this.state.fName[0],
            lName: this.state.lName[0],
            userName: this.state.userName[0],
            email: this.state.email[0],
            password: this.state.password[0]
        }
        console.log(this.state.password[0]);
        const data = await apiCall.postAPI('http://localhost:3000/signup', parameter);
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
                        <h1 className="px-5 pt-5">Signup</h1>
                        <form method="post" className="p-5">
                            <div className="form-group">
                                <input type="text" name="fName" className="form-control" onChange={this.getValue} placeholder="Fist Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="lName" className="form-control" onChange={this.getValue} placeholder="Last Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="userName" className="form-control" onChange={this.getValue} placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <p className="validation-error" >{this.state.emailError}</p>
                                <input type="email" name="email" className="form-control" onChange={this.getValue} placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <p className="validation-error" >{this.state.passwordError}</p>
                                <input type="password" name="password" className="form-control" onChange={this.getValue} placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <p className="validation-error" >{this.state.confirmPassError}</p>
                                <input type="password" name="confirmPass" className="form-control" onChange={this.getValue} placeholder="Confirm Password" />
                            </div>
                            <button type="button" className="btn btn-primary d-block my-4 mx-auto" onClick={this.signupHandler} disabled={!this.state.emailValid || !this.state.passwordValid || !this.state.confirmPassValid} >Signup</button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default Signup;