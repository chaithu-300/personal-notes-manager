
import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onLoginSuccess }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {

    if (!email || !password) {
      setMessage("Please fill all the fields");
      return;
    }

    loginUser(email, password)
  .then((data) => {
    // Store JWT tokens
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    setMessage("Login successful!");
    onLoginSuccess();
  })
  .catch((error) => {
    setMessage(error.message);
  });
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
