import React from 'react'

export default function ResetPassword() {
    return (
        <>
            <div className="login-container">
                <div className="form-container">
                    <h1 className="px-5 pt-5">Reset Password</h1>
                    <form className="p-5">
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm Password" />
                        </div>
                        <button type="submit" className="btn btn-primary d-block my-4 mx-auto">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}
