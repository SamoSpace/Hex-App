// components/AsideMenu.tsx
import React from "react";
import useNotes from "../hooks/useNotes";
import Link from "next/link";

const AsideMenu: React.FC = () => {
  const notes = useNotes(); // Obtén las notas desde Firebase

  return (
    <div className="bg-zinc-800 rounded-lg p-2 flex-1">
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-600">
            <Link href={`/note/${note.id}`} className="flex gap-4">
              {/* Puedes agregar una imagen representativa de la nota si lo deseas */}
              <div className="flex flex-auto flex-col truncate">
                <h4 className="csmedium text-lg">{note.title}</h4>
                <span className="font-light text-sm text-zinc-200/70">{note.hashtag}</span>
                <p className="text-sm text-zinc-400">{note.content.slice(0, 100)}...</p>
                <span className="text-xs text-zinc-500">Prioridad: {note.priority}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AsideMenu;
