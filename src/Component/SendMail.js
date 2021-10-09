import React from 'react'
import Header from './Header'

export default function SendMail() {
    return (
        <>
            <div className="login-container">
                <div className="form-container">
                    <h2 className="px-5 pt-5">Send Recovery Mail</h2>
                    <form className="p-5">
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <button type="submit" className="btn btn-primary d-block my-4 mx-auto">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}
