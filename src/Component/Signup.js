import './Css/form.css';
import React from 'react'

export default function Signup() {
    return (
        <>
            <div className="login-container">
                <div className="form-container">
                    <h1 className="px-5 pt-5">Signup</h1>
                    <form className="p-5">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Fist Name" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm Password" />
                        </div>
                        <button type="submit" className="btn btn-primary d-block my-4 mx-auto">Signup</button>
                    </form>
                </div>
            </div>
        </>
    )
}
