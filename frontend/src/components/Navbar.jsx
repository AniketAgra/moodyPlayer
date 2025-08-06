import React from 'react';
import './Navbar.css';
import { FaHeart, FaBars } from 'react-icons/fa';

export default function Navbar({ handleLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="app-name">🎵 Moody Player</h1>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>Home</li>
                    
                    {/* <li>Library</li> */}
                </ul>
                <FaHeart className="icon" />
                {/* <FaBars className="icon" /> */}
                <button className="login-button" onClick={handleLogout}>Logout</button>
                {/* <img
                    src="https://i.pravatar.cc/40?img=5"
                    alt="User"
                    className="avatar"
                /> */}
            </div>
        </nav>
    );
}
