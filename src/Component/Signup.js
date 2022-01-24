import './Css/form.css';
import React from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let apiCall = new ApiCall();

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
                <div className="container-fluid">
                    <div className="background">
                        <div className="row pt-md-5">
                            <div className="offset-lg-7 offset-md-5 col-lg-4 col-md-7 mt-md-5">
                                <h1 className="px-md-5 pt-5 text-primary">Signup</h1>
                                <form className="p-md-5 pt-4">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <input
                                                type="text"
                                                name="fName"
                                                className="w-100 p-2"
                                                onChange={this.getValue}
                                                placeholder="Fist Name"
                                                autocomplete="off"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input
                                                type="text"
                                                name="lName"
                                                className="w-100 p-2"
                                                onChange={this.getValue}
                                                placeholder="Last Name"
                                                autocomplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <input
                                                type="text"
                                                name="userName"
                                                className="w-100 p-2"
                                                onChange={this.getValue}
                                                placeholder="Username"
                                                autocomplete="off"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <p className="validation-error" >{this.state.emailError}</p>
                                            <input
                                                type="email"
                                                name="email"
                                                className="w-100 p-2"
                                                onChange={this.getValue}
                                                placeholder="Email"
                                                autocomplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <p className="validation-error" >{this.state.passwordError}</p>
                                            <input
                                                type="password"
                                                name="password"
                                                className="w-100 p-2"
                                                onChange={this.getValue}
                                                placeholder="Password"
                                                autocomplete="off"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <p className="validation-error" >{this.state.confirmPassError}</p>
                                            <input
                                                type="password"
                                                name="confirmPass"
                                                className="w-100 p-2"
                                                onChange={this.getValue}
                                                placeholder="Confirm Password"
                                                autocomplete="off"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary d-block my-5 mx-auto"
                                        onClick={this.signupHandler}
                                        disabled={!this.state.emailValid || !this.state.passwordValid || !this.state.confirmPassValid}
                                    >
                                        Signup
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default Signup;