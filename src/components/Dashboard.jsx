function Dashboard({ user, token, onLogout }) {
    return (
        <div className="dashboard-container">

            <div className="dashboard-card">

                <h1>Protected Dashboard</h1>

                <div className="success-message">
                    ✓ Login Successful
                </div>

                <h2>
                    Welcome, {user.username}!
                </h2>

                <div className="user-info">

                    <h3>User Information</h3>

                    <p>
                        <strong>User ID:</strong>{" "}
                        {user.userId}
                    </p>

                    <p>
                        <strong>Username:</strong>{" "}
                        {user.username}
                    </p>

                    <p>
                        <strong>Role:</strong>{" "}
                        <span className="role">
                            {user.role}
                        </span>
                    </p>

                </div>

                <div className="token-box">

                    <h3>Stored Token</h3>

                    <p>{token}</p>

                </div>

                <button
                    className="logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;