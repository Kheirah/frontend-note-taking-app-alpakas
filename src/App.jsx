import { useEffect, useState } from "react";
import "./App.css";

/* const url = "https://rest-and-expressjs-alpakas.onrender.com"; */
const localUrl = "http://localhost:3000";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState("Max");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getNotes();
    async function getNotes() {
      const res = await fetch(`${localUrl}/${user}`);
      const data = await res.json();
      if ("message" in data) {
        setMessage(data.message);
        setNotes([]);
      } else {
        setNotes(data);
        setMessage("");
      }
    }
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    const contentValue = event.target.content.value;

    const res = await fetch(`${localUrl}/${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: contentValue }),
    });
    event.target.reset();
    const data = await res.json();
    setMessage("message" in data ? data.message : "");
  }

  function handleDelete() {
    //todo delete a note
  }

  return (
    <>
      <h1>Note-taking app</h1>
      <div className="card">
        <button onClick={() => setUser("Sam")}>Sam</button>
        <button onClick={() => setUser("Max")}>Max</button>
        <button onClick={() => setUser("Eric")}>Eric</button>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.content}
              <button onClick={() => {}}>X</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input id="content" type="text" />
          <button>Add note</button>
        </form>
      </div>
      <p className="read-the-docs">Response from the server</p>
      <div>{message}</div>
    </>
  );
}

export default App;
