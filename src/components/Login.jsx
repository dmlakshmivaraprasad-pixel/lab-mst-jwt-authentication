import { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        // Mock credentials
        if (username === "admin" && password === "123456") {
            onLogin(username);
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="auth-container">
            <div className="login-card">

                <h1>JWT Authentication</h1>

                <p className="subtitle">
                    Secure Login & Session Management
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Enter username"
                        />
                    </div>


                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter password"
                        />
                    </div>


                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>

                </form>


                <div className="demo-info">

                    <p>
                        <strong>Demo Credentials</strong>
                    </p>

                    <p>Username: admin</p>

                    <p>Password: 123456</p>

                </div>

            </div>
        </div>
    );
}

export default Login;