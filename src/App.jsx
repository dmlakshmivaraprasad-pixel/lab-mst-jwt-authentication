import { useEffect, useState } from "react";

import Login from "./components/Login";

import Dashboard from "./components/Dashboard";

import "./App.css";


// =====================================
// CREATE MOCK JWT
// =====================================

function createMockJWT(username) {

  const header = {
    alg: "HS256",
    typ: "JWT",
  };


  const payload = {
    userId: 101,
    username: username,
    role: "user",

    exp:
      Math.floor(Date.now() / 1000) +
      60 * 60,
  };


  const encode = (object) => {

    return btoa(
      JSON.stringify(object)
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  };


  const encodedHeader =
    encode(header);

  const encodedPayload =
    encode(payload);


  // Simulated signature

  const signature =
    btoa("mock-signature-123456");


  return (
    `${encodedHeader}.` +
    `${encodedPayload}.` +
    `${signature}`
  );
}


// =====================================
// DECODE JWT
// =====================================

function decodeJWT(token) {

  try {

    const parts =
      token.split(".");

    if (parts.length !== 3) {
      return null;
    }


    const payload =
      parts[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");


    return JSON.parse(
      atob(payload)
    );

  } catch (error) {

    return null;

  }
}


// =====================================
// CHECK TOKEN
// =====================================

function isTokenValid(token) {

  const payload =
    decodeJWT(token);


  if (!payload) {
    return false;
  }


  const currentTime =
    Math.floor(Date.now() / 1000);


  return payload.exp > currentTime;
}


// =====================================
// APP
// =====================================

function App() {

  const [token, setToken] =
    useState(null);

  const [user, setUser] =
    useState(null);


  // ===================================
  // CHECK SAVED TOKEN
  // ===================================

  useEffect(() => {

    const savedToken =
      localStorage.getItem("jwtToken");


    if (
      savedToken &&
      isTokenValid(savedToken)
    ) {

      const decodedUser =
        decodeJWT(savedToken);


      setToken(savedToken);

      setUser(decodedUser);

    } else {

      localStorage.removeItem(
        "jwtToken"
      );

    }

  }, []);


  // ===================================
  // LOGIN
  // ===================================

  const handleLogin = (username) => {

    const newToken =
      createMockJWT(username);


    localStorage.setItem(
      "jwtToken",
      newToken
    );


    const decodedUser =
      decodeJWT(newToken);


    setToken(newToken);

    setUser(decodedUser);

  };


  // ===================================
  // LOGOUT
  // ===================================

  const handleLogout = () => {

    localStorage.removeItem(
      "jwtToken"
    );


    setToken(null);

    setUser(null);

  };


  // ===================================
  // DASHBOARD
  // ===================================

  if (token && user) {

    return (
      <Dashboard
        user={user}
        token={token}
        onLogout={handleLogout}
      />
    );

  }


  // ===================================
  // LOGIN PAGE
  // ===================================

  return (
    <Login
      onLogin={handleLogin}
    />
  );
}


export default App;