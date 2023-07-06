import React from "react";
import "./EventThank.css";

const EventThank = () => {
    return (
        <div className="thankContainer">
            <h1 style={{ color: "black" }}>Thankyou for registering!</h1>
            <span style={{fontSize: "large", padding: "10px"}}>You will recieve a confirmation mail soon..</span>
            <button>Go Home</button>
        </div>
    )
}

export default EventThank