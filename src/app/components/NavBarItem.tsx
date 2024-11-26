// components/AsideItem.tsx
import Link from 'next/link';
import React from 'react';

interface Props {
  href?: string;
  children: React.ReactNode; 
  // Para que el contenido dentro de <AsideItem> sea dinámico
}

const AsideItem: React.FC<Props> = ({ href, children }) => {
  return (
    <li>
      <Link
        className="flex gap-4 mb-2 p-2 text-zinc-400 hover:text-zinc-200 text-center transition duration-300"
        href={`${href}`}
      >
        {children} {/* Esto es el contenido dinámico que reemplaza al <slot/> en Astro */}
      </Link>
    </li>
  );
};

export default AsideItem;
