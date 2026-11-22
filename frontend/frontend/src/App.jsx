
import React, { useState } from "react";
import "./App.css";
import { registerUser, loginUser, getNotes } from "./App.js";

function App() {

  
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");

const handleRegister = () => {

  if (password !== confirmPassword) {
    setMessage("Passwords do not match");
    return;
  }

  registerUser(name, email, password).then(() => {
    setMessage("Registration successful!");
    setPage("login");
  });

};


return (
    <>

{page === "register" && (

  <div className="register-container">

    <h1>Create Account</h1>

    <input
      type="text"
      placeholder="Enter Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />

    <button onClick={handleRegister}>
      Register
    </button>

    <p>{message}</p>

    <button onClick={() => setPage("login")}>
      Login
    </button>

  </div>

)}
</>
      

export default App;
