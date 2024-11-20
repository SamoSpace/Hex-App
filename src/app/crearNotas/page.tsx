"use client";
import { useState } from "react";
import { db } from "@/app/fb/firebase"; // Configuración de Firebase
import { collection, addDoc } from "firebase/firestore";

interface NoteData {
  hashtag: string;
  title: string;
  noteType: "quick" | "lore" | "leaks";
  content: string;
  signature: string;
  sources?: string;
  published: boolean; // Campo inicial para estado de publicación
}

const NoteForm: React.FC = () => {
  const [noteData, setNoteData] = useState<NoteData>({
    hashtag: "",
    title: "",
    noteType: "quick",
    content: "",
    signature: "",
    sources: "",
    published: false, // Estado inicial
  });

  const wordLimits = {
    quick: 150,
    lore: 400,
    leaks: 200,
  };

  const handleInputChange = (field: keyof NoteData, value: string) => {
    setNoteData((prev) => ({ ...prev, [field]: value }));
  };

  const saveToFirebase = async () => {
    const { hashtag, title, noteType, content, signature } = noteData;

    // Validaciones
    if (!signature) {
      alert("La firma es obligatoria.");
      return;
    }
    if (title.split(" ").length > 10) {
      alert("El título debe tener un máximo de 10 palabras.");
      return;
    }
    if (content.split(" ").length > wordLimits[noteType]) {
      alert(
        `El contenido supera el límite de ${wordLimits[noteType]} palabras.`
      );
      return;
    }

    const formattedNote: NoteData = {
      ...noteData,
      title: `#${hashtag} | ${title.toUpperCase()}`,
    };

    try {
      await addDoc(collection(db, "notes"), formattedNote);
      alert("Nota guardada exitosamente en Firebase.");
      setNoteData({
        hashtag: "",
        title: "",
        noteType: "quick",
        content: "",
        signature: "",
        sources: "",
        published: false,
      }); // Reiniciar formulario
    } catch (error) {
      console.error("Error al guardar nota en Firebase:", error);
      alert("Hubo un problema al guardar la nota.");
    }
  };

  return (
    <form className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Hashtag (sin #)"
        className="border rounded p-2 w-full"
        value={noteData.hashtag}
        onChange={(e) => handleInputChange("hashtag", e.target.value)}
      />
      <input
        type="text"
        placeholder="Título (máximo 10 palabras)"
        className="border rounded p-2 w-full"
        value={noteData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <select
        className="border rounded p-2 w-full"
        value={noteData.noteType}
        onChange={(e) =>
          handleInputChange("noteType", e.target.value as NoteData["noteType"])
        }
      >
        <option value="quick">Nota Rápida</option>
        <option value="lore">Nota de Lore</option>
        <option value="leaks">Nota de Leaks</option>
      </select>
      <textarea
        placeholder={`Contenido (máximo ${wordLimits[noteData.noteType]} palabras)`}
        className="border rounded p-2 w-full"
        value={noteData.content}
        onChange={(e) => handleInputChange("content", e.target.value)}
      />
      <input
        type="text"
        placeholder="Firma (obligatoria)"
        className="border rounded p-2 w-full"
        value={noteData.signature}
        onChange={(e) => handleInputChange("signature", e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Fuentes (opcional)"
        className="border rounded p-2 w-full"
        value={noteData.sources}
        onChange={(e) => handleInputChange("sources", e.target.value)}
      />
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded"
        onClick={saveToFirebase}
      >
        Guardar Nota
      </button>
    </form>
  );
};

export default NoteForm;
