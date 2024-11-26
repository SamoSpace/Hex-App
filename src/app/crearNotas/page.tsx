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
  priority: "alta" | "media" | "baja"; // Nueva propiedad para prioridad
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
    priority: "media", // Valor por defecto para la prioridad
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
    const { hashtag, title, noteType, content, signature, priority } = noteData;

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
        priority: "media", // Restablecemos la prioridad al valor por defecto
      }); // Reiniciar formulario
    } catch (error) {
      console.error("Error al guardar nota en Firebase:", error);
      alert("Hubo un problema al guardar la nota.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl text-white">Nueva Nota: </h2>
      <form className="space-y-4 p-4 flex flex-col justify-center text-black">
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
          className="border rounded p-2 w-full text-black"
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
        
        {/* Select de prioridad */}
        <select
          className="border rounded p-2 w-full"
          value={noteData.priority}
          onChange={(e) => handleInputChange("priority", e.target.value as NoteData["priority"])}
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <button
          type="button"
          className="bg-[var(--titles)] text-black p-2 rounded"
          onClick={saveToFirebase}
        >
          Guardar Nota
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
