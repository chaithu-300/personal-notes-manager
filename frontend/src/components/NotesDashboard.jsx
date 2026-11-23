
import { useEffect, useState } from "react";
import { getNotes } from "../services/api";

function NotesDashboard({ onLogout }) {

  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("Loading notes...");


   async function fetchNotes() {
  const result = await getNotes();

  if (result.error) {
    setMessage(result.error);
    return;
  }

  const data = result.data;
  let notesList = [];

  if (Array.isArray(data)) {
    notesList = data;
  } else if (data && data.notes) {
    notesList = data.notes;
  }

  setNotes(notesList);

  if (notesList.length === 0) {
    setMessage("You don't have any notes yet.");
  } else {
    setMessage("");
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
