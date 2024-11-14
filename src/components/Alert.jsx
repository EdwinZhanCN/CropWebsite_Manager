import React from "react";
import "@/style/Alert.css";

function Alert({message, show}) {
    return (
        <div className={`alert ${show}`}>
            {message}
            <a href='/setting'> Setting </a>
        </div>
    );
}

export default Alert;