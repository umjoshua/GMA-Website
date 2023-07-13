import React from "react";
import "./EventThank.css";
import { useNavigate } from "react-router-dom";

const EventThank = ({ error }) => {
    const navigate = useNavigate();
    return (
        <>
            {!error ?
                <div className="thankContainer">
                    <h1 style={{ color: "black", textAlign: 'center' }}>Thankyou for registering!</h1>
                    <span style={{ fontSize: "large", padding: "10px" }}>You will recieve a confirmation mail soon..</span>
                    <button onClick={() => navigate('/')}>Go Home</button>
                </div> : <div className="thankContainer">
                    <h1 style={{ color: "black", textAlign: 'center' }}>An error occured!</h1>
                    <span style={{ fontSize: "large", padding: "10px" }}>{error}</span>
                    <button onClick={() => navigate('/')}>Go Home</button>
                </div>
            }
        </>
    )
}

export default EventThank