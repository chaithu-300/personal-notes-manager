
import { useEffect, useState } from "react";

function NotesDashboard({ onLogout }) {

  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("Loading notes...");

  async function refreshAccessToken() {

    const refreshToken = localStorage.getItem("refresh_token");

    const response = await fetch("http://127.0.0.1:8001/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh_token: refreshToken
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Session expired. Please login again.");
    }

    localStorage.setItem("access_token", data.access_token);

    return data.access_token;
  }


  async function fetchNotes() {

    try {

      let accessToken = localStorage.getItem("access_token");

      let response = await fetch("http://127.0.0.1:8001/notes", {
        method: "GET",
        headers: {
          "token": accessToken
        }
      });

      // Refresh token if access token expires
      if (response.status === 401) {

        accessToken = await refreshAccessToken();

        response = await fetch("http://127.0.0.1:8001/notes", {
          method: "GET",
          headers: {
            "token": accessToken
          }
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to fetch notes");
      }

      let notesList = [];

      if (Array.isArray(data)) {
        notesList = data;
      } else if (data && Array.isArray(data.notes)) {
        notesList = data.notes;
      }

      setNotes(notesList);

      if (notesList.length === 0) {
        setMessage("You don't have any notes yet.");
      } else {
        setMessage("");
      }

    } catch (error) {

      setMessage(error.message);

      if (error.message.includes("Session expired")) {
        onLogout();
      }

    }
  }


  function displayDate(createdAt) {

    if (createdAt) {
      return new Date(createdAt).toLocaleString();
    }

    return "Date unavailable";
  }


  useEffect(() => {
    fetchNotes();
  }, []);


  return (
    <div className="dashboard">

      <h1>My Notes</h1>

      <button onClick={onLogout}>
        Logout
      </button>

      <p>{message}</p>

      {notes.map((note) => (

        <div className="note-card" key={note.id}>

          <h3>{note.title}</h3>

          <p>{note.content}</p>

          <small>
            Created: {displayDate(note.created_at)}
          </small>

        </div>

      ))}

    </div>
  );
}

export default NotesDashboard;
