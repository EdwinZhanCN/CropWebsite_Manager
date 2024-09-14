// src/components/SideBar.jsx
import React from 'react';
import '@/style/SideBar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

const SideBar = () => {
    return (
        <div className="sidebar">
            <ul>
                <div className="avatar-image"></div>
                <li><a href="/">Picker</a></li>
                <li><a>Clients</a></li>
                <li><a>Contact</a></li>
            </ul>
            <div className="tool-container">
                <button className="tool-button">
                    <FontAwesomeIcon style={{fontSize:"20px"}} icon={"gear"} />
                </button>
                <button className="tool-button">
                    <FontAwesomeIcon style={{fontSize:"20px"}} icon={faTriangleExclamation} />
                </button>
            </div>
        </div>
    );
};

export default SideBar;