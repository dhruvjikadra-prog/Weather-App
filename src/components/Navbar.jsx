import { useState } from "react";
import "../assets/Home.css";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo"><i className="fas fa-globe-americas"></i> ProWeather</div>

            <div
                className={`hamburger ${open ? "active" : ""}`}
                onClick={() => setOpen(!open)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={`nav-links ${open ? "show" : ""}`}>
                <li><i className="fas fa-home"></i> Home</li>
                <li><i className="fas fa-cloud-sun"></i> Forecast</li>
                <li><i className="fas fa-info-circle"></i> About</li>
                <li><i className="fas fa-user outline-primary"></i> Login</li>
            </ul>
        </nav>
    );
}

export default Navbar;
