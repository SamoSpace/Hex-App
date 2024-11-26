// hooks/useNotes.ts
"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/fb/firebase";

interface Note {
  id: string;
  hashtag: string;
  title: string;
  content: string;
  signature: string;
  priority: "alta" | "media" | "baja";
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
        const notesCollection = collection(db, "notes");
        const notesSnapshot = await getDocs(notesCollection);
        const notesData = notesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
    
        setNotes(notesData);
      };

    fetchNotes();
  }, []);

  return notes;
};

export default useNotes;
