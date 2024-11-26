"use client";
import { HomeIcon } from "@/app/components/IconsManager"
import { LibraryIcon } from "@/app/components/IconsManager"
import { SearchIcon } from "@/app/components/IconsManager"
import AsideItem from "@/app/components/NavBarItem"
import NavBarCard from "@/app/components/NavBarCard"
// import AsideMenuCard from './AsideMenuCard.astro'

export default function Navbar(){
    return(
        <nav className="flex flex-col flex-1 gap-2 ">
            <div className="bg-zinc-800 rounded-lg p-4">
                <ul>
                    <AsideItem href="/">
                    <HomeIcon/>
                        Home
                    </AsideItem>
                    <AsideItem href="/crearNotas">
                    <SearchIcon/>
                         Crear Notas
                    </AsideItem>
                </ul>
            </div>
            <div className="bg-zinc-800 rounded-lg p-2 flex-1">
            <ul>
                <AsideItem href="/#">
                <LibraryIcon/>
                    Historial de Notas
                </AsideItem>
            </ul>
            <NavBarCard/>
            </div>
        </nav>
    )
}
