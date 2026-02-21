function Footer() {
  return (
    <footer className="footer-section text-white mt-5">
      <div className="container py-5">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">
              <i className="fas fa-cloud-sun me-2"></i>
              ProWeather
            </h5>
            <p className="footer-text">
              ProWeather is a modern weather dashboard providing
              real-time weather updates, air quality index,
              5-day forecasts, and location-based insights.
              Stay informed anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li>Home</li>
              <li>Forecast</li>
              <li>Air Quality</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p><i className="fas fa-envelope me-2"></i> support@proweather.com</p>
            <p><i className="fas fa-phone me-2"></i> +91 98765 43210</p>

            <div className="social-icons mt-3">
              <i className="fab fa-facebook-f me-3"></i>
              <i className="fab fa-twitter me-3"></i>
              <i className="fab fa-instagram me-3"></i>
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="text-center">
          <p className="mb-1">
            © {new Date().getFullYear()} ProWeather. All Rights Reserved.
          </p>
          <p className="mb-0">
            Developed by <strong>Dhruv Jikadra</strong> |
            <a
              href="https://github.com/dhruvjikadra-prog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-info ms-1"
            >
              View on GitHub
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
