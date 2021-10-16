import './Css/form.css';
import React from 'react'

export default function Login(props) {

    function routeChange(path) {
        props.history.push(path);
    }

    function loginHandler() {
        localStorage.setItem('isLogin', true);
        routeChange('/home');
        window.location.reload();
    }

    return (
        <>
            <div className="login-container">
                <div className="form-container">
                    <h1 className="px-5 pt-5">Login</h1>
                    <form className="p-5">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Email or Username" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary d-block my-4 mx-auto" onClick={()=>{loginHandler()}}>Login</button>
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
        </>
    )
}
