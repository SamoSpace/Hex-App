import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/NavBar"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen p-2">
        <div id="main-layout" className="relative h-screen p-2 gap-2">
          <aside className="[grid-area:aside] flex flex-col overflow-auto">
            <NavBar/>
          </aside>
          <main className="[grid-area:notas] rounded-lg bg-zinc-800 overflow-y-auto flex-1 text-white">
            {children}
          </main>
          <footer className="[grid-area:footer]">
            Footer
          </footer>
        </div>
      </body>
    </html>
  );
}
