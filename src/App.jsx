import { useEffect, useState } from "react";
import "./App.css";

const url = "https://rest-and-expressjs-alpakas.onrender.com";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState("Max");

  useEffect(() => {
    getNotes();
    async function getNotes() {
      const res = await fetch(`${url}/${user}`);
      const data = await res.json();
      console.log(data);
      setNotes(data);
    }
  }, [url, user]);

  return (
    <>
      <h1>Note-taking app</h1>
      <div className="card">
        <button onClick={() => setUser("Sam")}>Sam</button>
        <button onClick={() => setUser("Max")}>Max</button>
        <button onClick={() => setUser("Eric")}>Eric</button>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">Response from the server</p>
    </>
  );
}

export default App;
