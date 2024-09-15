// src/components/SideBar.jsx
import React from 'react';
import '@/style/SideBar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import {useNavigate} from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <ul>
                <a href="/avatar">
                    <div className="avatar-image">
                    </div>
                </a>
                <li><a href="/">Picker</a></li>
                <li><a>Clients</a></li>
                <li><a>Contact</a></li>
            </ul>
            <div className="tool-container">
                <button className="tool-button">
                    <FontAwesomeIcon style={{fontSize:"20px"}} icon={"gear"} />
                </button>
                <button className="tool-button" onClick={() => navigate("/report")}>
                    <FontAwesomeIcon style={{fontSize:"20px"}} icon={faTriangleExclamation} />
                </button>
            </div>
        </div>
    );
};

export default SideBar;