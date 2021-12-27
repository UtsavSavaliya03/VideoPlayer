import './Css/form.css';
import React from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

let apiCall = new ApiCall();

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: 4,
            seconds: 59,
            otp: null,
            password: null,
            confirmPass: null,
            passwordError: null,
            confirmPassError: null,
            passwordValid: false,
            confirmPassValid: false
        }
    }

    componentDidMount() {
        setInterval(() => this.setTime(), 1000);
    }

    setTime() {
        if (this.state.minutes === 0 && this.state.seconds === 0) {
            this.routeChange('/sendMail');
        }
        return this.setState((state) => {
            return {
                seconds: state.seconds === 0 ? 59 : state.seconds - 1,
                minutes: state.seconds === 0 ? state.minutes - 1 : state.minutes,
            }
        })
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
                    confirmPassError = null;
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
        const email = localStorage.getItem('email');
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
                <div className="container-fluid">
                    <div className="row pt-5">
                        <div className="offset-md-7 col-md-4 mt-5">
                            {/* <h5 className='px-5 py-5 text-center'>Your OTP will be expire in <span> {this.state.minutes} : {this.state.seconds}</span></h5> */}
                            <h1 className="px-5 mt-4 text-primary">Reset Password</h1>
                            <form className="p-5">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        name="otp"
                                        className="w-100 p-2"
                                        onChange={this.getValue}
                                        placeholder="Otp"
                                        autocomplete="off"
                                    />
                                </div>
                                <div className="form-group">
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
                                <div className="form-group">
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
                                <button
                                    type="button"
                                    className="btn btn-primary d-block my-5 mx-auto"
                                    onClick={this.ResetPassword}
                                    disabled={!this.state.passwordValid || !this.state.confirmPassValid}
                                >
                                    Reset Password
                                </button>
                                <h5 className={(this.state.seconds) % 2 === 0 ? 'text-danger text-center' : 'text-success text-center'}>Your OTP will be expire in <span> {this.state.minutes} : {this.state.seconds}</span></h5>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        )
    }
}

export default ResetPassword;
