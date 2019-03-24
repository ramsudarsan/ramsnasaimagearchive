import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Welcome.css';

const Welcome = () => {
    return (
        <div className="WelcomeContainer">
            <div className="MainWelcomeContainer">
                <h1> Welcome </h1>
            </div>
            <div className="InstructionContainer">
                <h3> How to use this website </h3>
                <p> Enter a search term, and, optionally, enter additional refinements by clicking the "Refine Search" button.
                When you are satisfied with your selections, press "Search" to display the results.
                Additionally you can choose to leave all search fields blank and press "Search" to view all image results.</p>
                <p>If you would like to view more information from the resulting cards, click on one to bring up an expanded view.
                From this view, you may click on the image to open it up in a new window.
                </p>
                <p> You can also use query parameters in the URL, or copy and paste previous search URLs to bring up the results that you would like automatically.</p>
                <p> Thank you for visiting! Click the "Enter" button below to continue. </p>
                <div className="EnterButtonHolder"><Link to="/search" style={{ color: '#dd361c', fontSize: 24 }}> Enter </Link></div>
            </div>

        </div>
    );
}

export default Welcome;