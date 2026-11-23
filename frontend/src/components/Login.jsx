
import { useState } from "react";

function Login({ onLoginSuccess }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {

    if (!email || !password) {
      setMessage("Please fill all the fields");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:8001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store JWT tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      setMessage("Login successful!");

      onLoginSuccess();

    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="container">

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>{message}</p>

    </div>
  );
}

export default Login;
