
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginemail,setLoginemail]=useState("")
  const[loginpassword,setLoginpassword]=useState("")

  function handleRegister() {
    if (!username || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    alert("You registered successfully!");
  }
    function handleLogin() {
    if (!loginemail || !loginpassword) {
      alert("Please fill all the fields");
      return;
    }
    if (loginemail === email && loginpassword === password) {
      alert("Login successful! Welcome " + username);
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <>
      <div className="personal-notes-manager">
        <h1>Welcome to the Personal-Notes-Manager</h1>
        <p>Create your account to get started</p>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>
        Register
        </button>
        <h2>Registration Details</h2>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>password:{password}</p>
      </div>

      <div>
        <input
         type="loginemail"
         placeholder="Enter loginemail"
         value={loginemail}
         onChange={(e)=>setLoginemail(e.target.value)}
         />
        <input
         type="loginpassword"
         placeholder="Enter loginpassword"
         onChange={(e)=>setLoginpassword(e.target.value)}
         />
        
        <button onClick={handleLogin}>
          Login
        </button>
        <h2>login Details</h2>
        <p>loginemail: {email}</p>
        <p>loginpassword: {loginpassword}</p>
        
      </div>
    </>
  );
}

export default App;
