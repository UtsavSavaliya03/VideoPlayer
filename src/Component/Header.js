import logo from '../assets/Images/text-logo.png';
import './Css/Header.css';
import React from 'react';

export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            {/* <div className="button-container">
                <a href="/" className="btn btn-primary">Login</a>
                <a href="/signup" className="btn btn-primary">Signup</a>
                <a href="" className="btn btn-primary">Create Channel</a>
            </div> */}
            <div className="clear"></div>
        </div>
    )
}
