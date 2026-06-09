import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-cloud-sun me-2"></i>
          ProWeather
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-cloud me-1"></i> Forecast
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="fas fa-info-circle me-1"></i> About
              </Link>
            </li>

            {/* Theme Toggle */}
            <li className="nav-item">
              <button
                className="btn btn-outline-warning rounded-pill px-3 py-1"
                onClick={toggleTheme}
                style={{ fontSize: '0.82rem', border: '1px solid rgba(255,193,7,0.45)' }}
              >
                {theme === "dark" ? (
                  <><i className="fas fa-sun me-1"></i> Light</>
                ) : (
                  <><i className="fas fa-moon me-1"></i> Dark</>
                )}
              </button>
            </li>

            {/* Auth */}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="btn btn-warning rounded-pill px-3" to="/login"
                  style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0a0a0a' }}>
                  <i className="fas fa-user me-1"></i> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn rounded-pill dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: 'white',
                    fontSize: '0.85rem',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <i className="fas fa-user-circle me-1"></i>
                  {userName || "My Account"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
