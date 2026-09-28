import { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        if (username === "admin" && password === "123456") {
            onLogin(username);
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>JWT Authentication</h1>

                <p className="subtitle">
                    Login to access your dashboard
                </p>

                <form onSubmit={handleLogin}>

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <div className="demo-info">
                    <strong>Demo Credentials</strong>

                    <p>
                        Username: admin
                    </p>

                    <p>
                        Password: 123456
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;