import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/Login.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        if (password.length < 8 ) {
            setError("Passwords must be 8 Characters Long");
            return;
        }

        const userData = { name, email, password };

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("userName", name);

        navigate("/");
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Signup</h2>

                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="User Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit" onClick={handleSignup}>Signup</button>
                </form>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
