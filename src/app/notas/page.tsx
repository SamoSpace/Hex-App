"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/fb/firebase"; // Configuración de Firebase
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

interface Note {
  id: string;
  hashtag: string;
  title: string;
  noteType: string;
  content: string;
  signature: string;
  sources?: string;
  published: boolean;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const notesCollection = collection(db, "notes");
    const notesSnapshot = await getDocs(notesCollection);
    const notesData = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Note[];

    setNotes(notesData);
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, { published: !currentStatus });
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, published: !currentStatus } : note
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de publicación:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Notas</h1>
      {notes.map((note) => (
        <div
          key={note.id}
          className="border rounded p-4 flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">{note.title}</h2>
            <p className="text-sm text-gray-500">{note.content}</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={note.published}
                onChange={() => togglePublished(note.id, note.published)}
              />
              <span className="ml-2 text-sm">Publicada</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesPage;
