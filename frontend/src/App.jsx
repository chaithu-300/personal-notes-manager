
import { useState } from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import NotesDashboard from "./components/NotesDashboard";

import "./App.css";

function App() {

  const [page, setPage] = useState("register");

  function handleLogout() {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setPage("login");
  }

  return (
    <div className="app">

      <h1>Personal Notes Manager</h1>

      {page === "register" && (
        <Register
          onRegisterSuccess={() => setPage("login")}
        />
      )}

      {page === "login" && (
        <Login
          onLoginSuccess={() => setPage("dashboard")}
        />
      )}

      {page === "dashboard" && (
        <NotesDashboard
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}

export default App;
