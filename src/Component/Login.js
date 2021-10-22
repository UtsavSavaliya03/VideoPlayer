import './Css/form.css';
import React from 'react';
import ApiCall from '../ServiceManager/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let apiCall = new ApiCall;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userOrEmail: '',
            password: '',
            isValid: false
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

    loginHandler = async () => {
        const parameter = {
            userName: this.state.userOrEmail[0],
            email: this.state.userOrEmail[0],
            password: this.state.password[0]
        }

        //-----------------------------------------------------------------------------
        // localStorage.setItem('email', this.state.userOrEmail);
        //-----------------------------------------------------------------------------
        
        const data = await apiCall.postAPI('http://localhost:3000/login', parameter);
        console.log(data);
        
        this.displayAlert(data.status, data.msg)
        
        if (data.status) {
            localStorage.setItem('isLogin', true);
            localStorage.setItem('user_id', data.data.user[0].user_id);
            this.routeChange('/');
            window.location.reload();
        }
    }

    validation = (value) => {
        if (value != null) {
            this.setState({ isValid: true });
        }
    }

    getValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: [value] }, () => { this.validation(value) });
    }

    render() {
        return (
            <>
                <div className="login-container">
                    <div className="form-container">
                        <h1 className="px-5 pt-5">Login</h1>
                        <form className="p-5">
                            <div className="form-group">
                                <input type="text" className="form-control" name="userOrEmail" onChange={this.getValue} placeholder="Email or Username" required />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" onChange={this.getValue} placeholder="Password" required />
                            </div>
                            {/* disabled={!this.state.isValid} */}
                            <button type="button" className="btn btn-primary d-block my-4 mx-auto" onClick={this.loginHandler}>Login</button>
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
}

export default Login;