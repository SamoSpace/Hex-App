// app/note/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import useNotes from "@/app/hooks/useNotes"; // Ajusta la ruta según tu estructura de carpetas
import Loader from '@/app/components/Loader';

const NotePage: React.FC = () => {
  const { id } = useParams(); // Captura el `id` desde la URL dinámica
  const notes = useNotes(); // Obtén todas las notas de Firebase

  // Busca la nota con el id correspondiente
  const note = notes.find((note) => note.id === id);

  // Muestra un mensaje de "Cargando..." si la nota no se encuentra
  if (!note) return <> <Loader/></>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="text-sm text-gray-500">{note.hashtag}</p>
      <p>{note.content}</p>
      <p className="text-xs text-gray-400">Firmado por: {note.signature}</p>
      <p className="text-xs text-gray-400">Prioridad: {note.priority}</p>
    </div>
  );
};

export default NotePage;
