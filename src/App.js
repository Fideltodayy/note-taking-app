// NoteApp.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    // Fetch all notes from the backend when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/notes");
      console.log(response.data.data);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  axios.defaults.headers.common["access-control-allow-origin"] = "*";

  const handleNoteCreate = async () => {
    try {
      await axios.post("http://your-backend-api-url/blogs", newNote);
      fetchNotes(); // Refresh the list of notes after creating a new one
      setNewNote({ title: "", content: "" }); // Clear the form
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleNoteUpdate = async () => {
    try {
      await axios.put(
        `http://your-backend-api-url/blogs/${selectedNote._id}`,
        selectedNote
      );
      fetchNotes(); // Refresh the list of notes after updating
      setSelectedNote(null); // Clear the selected note after updating
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleNoteDelete = async (id) => {
    try {
      await axios.delete(`http://your-backend-api-url/blogs/${id}`);
      fetchNotes(); // Refresh the list of notes after deleting
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Note-taking App</h1>

      {/* Note Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={handleNoteCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Note
        </button>
      </div>

      {/* List of Notes */}
      {notes.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id} className="border-b border-gray-300 py-4">
              <div>
                <strong className="text-lg font-bold">{note.title}</strong>
                <p className="text-gray-600">{note.content}</p>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => handleNoteSelect(note)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleNoteDelete(note._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Edit Note Form */}
      {selectedNote && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Note</h2>
          <input
            type="text"
            value={selectedNote.title}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, title: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <textarea
            value={selectedNote.content}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, content: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1"
          />
          <button
            onClick={handleNoteUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Update Note
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteApp;
