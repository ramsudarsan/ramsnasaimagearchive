import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Header.css';

const Header = ({ signedIn }) => {
    return (
        <Router>
            <div className = "headersplit">
                <div className="logo">
                    <h2><a className="orange">Ram's</a> NASA Image Archive</h2>
                </div>
                <div className="links">
                    <ul className="linkslist">
                        <li className = "listitem">
                            <Link to="/signin">Sign In</Link>
                        </li>
                        <li className = "listitem">
                            <Link to="/profile"> My Profile </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Router>
    );
}

export default Header;