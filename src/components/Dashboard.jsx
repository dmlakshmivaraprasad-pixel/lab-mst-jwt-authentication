function Dashboard({ user, token, onLogout }) {
    return (
        <div className="dashboard-container">

            <div className="dashboard-card">

                <h1>
                    Welcome, {user.username}!
                </h1>


                <p className="success-message">
                    ✓ Authentication successful
                </p>


                <div className="user-info">

                    <h2>User Information</h2>

                    <p>
                        <strong>Username:</strong>{" "}
                        {user.username}
                    </p>

                    <p>
                        <strong>Role:</strong>{" "}
                        {user.role}
                    </p>

                    <p>
                        <strong>User ID:</strong>{" "}
                        {user.userId}
                    </p>

                </div>


                <div className="token-section">

                    <h2>JWT Token</h2>

                    <textarea
                        value={token}
                        readOnly
                    />

                </div>


                <div className="session-section">

                    <h2>Session Status</h2>

                    <p className="session-active">
                        ✓ Active session
                    </p>

                    <p>
                        Token stored in localStorage
                    </p>

                </div>


                <button
                    className="logout-btn"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;