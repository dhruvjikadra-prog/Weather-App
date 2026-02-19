import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

   useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center">

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
              <Link className="nav-link" to="/">
                <i className="fas fa-info-circle me-1"></i> About
              </Link>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item ms-lg-3">
                <Link className="btn btn-warning rounded-pill px-3" to="/login">
                  <i className="fas fa-user me-1"></i> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown ms-lg-3">
                <button
                  className="btn btn-outline-light rounded-pill dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user-circle me-1"></i> {userName || "My account"}
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
