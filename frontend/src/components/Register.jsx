
import { useState } from "react";
import { registerUser } from "../services/api";

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

     registerUser(username, email, password)
      .then(() => {
        setMessage("You registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        onRegisterSuccess();
      })
      .catch((error) => {
        setMessage(error.message);
      });
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
