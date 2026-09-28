import { useState } from "react";

import Login from "./components/Login";

import Dashboard from "./components/Dashboard";

import "./App.css";


// Create simulated JWT token
function createToken(username) {

  const userData = {
    userId: 101,
    username: username,
    role: "Student"
  };

  const token = btoa(
    JSON.stringify(userData)
  );

  return token;
}


// Decode simulated JWT token
function decodeToken(token) {

  try {

    const decodedData = atob(token);

    return JSON.parse(decodedData);

  } catch (error) {

    return null;

  }
}


function App() {

  // Get token from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );


  // Get user information from token
  const [user, setUser] = useState(() => {

    const savedToken =
      localStorage.getItem("token");

    if (!savedToken) {
      return null;
    }

    return decodeToken(savedToken);

  });


  // Login function
  const handleLogin = (username) => {

    const newToken =
      createToken(username);

    // Store token
    localStorage.setItem(
      "token",
      newToken
    );

    // Decode token
    const decodedUser =
      decodeToken(newToken);

    setToken(newToken);

    setUser(decodedUser);
  };


  // Logout function
  const handleLogout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };


  // Protected Dashboard
  if (token && user) {

    return (
      <Dashboard
        user={user}
        token={token}
        onLogout={handleLogout}
      />
    );

  }


  // Login page
  return (
    <Login
      onLogin={handleLogin}
    />
  );
}


export default App;