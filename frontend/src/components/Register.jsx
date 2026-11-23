
import { useState } from "react";

function Register({ onRegisterSuccess }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister() {

    if (!username || !email || !password) {
      setMessage("Please fill all the fields");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:8001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      setMessage("You registered successfully!");

      setUsername("");
      setEmail("");
      setPassword("");

      onRegisterSuccess();

    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="container">

      <h2>Registration</h2>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <button onClick={handleRegister}>
        Register
      </button>

      <p>{message}</p>

    </div>
  );
}

export default Register;
