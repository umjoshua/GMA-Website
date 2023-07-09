import React from "react";
import "./EventThank.css";
import { useNavigate } from "react-router-dom";

const EventThank = () => {
    const navigate = useNavigate();
    return (
        <div className="thankContainer">
            <h1 style={{ color: "black" }}>Thankyou for registering!</h1>
            <span style={{ fontSize: "large", padding: "10px" }}>You will recieve a confirmation mail soon..</span>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    )
}

export default EventThank