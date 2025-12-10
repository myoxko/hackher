import React, { useEffect } from "react";
import HeroTerminal from "./components/sections/HeroTerminal.jsx";
import PuzzleAccess from "./components/sections/PuzzleAccess.jsx";
import FeedAbout from "./components/sections/FeedAbout.jsx";
import ProjectsExplorer from "./components/sections/ProjectsExplorer.jsx";
import ContactScratch from "./components/sections/ContactScratch.jsx";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <main className="min-h-svh bg-[radial-gradient(1200px_800px_at_70%_-10%,#0d1520_0%,#070a0e_60%,#05070a_100%)] text-slate-100">
      <HeroTerminal />
      <PuzzleAccess />
      <FeedAbout />
      <ProjectsExplorer />
      <ContactScratch />
      <footer className="py-8 text-center text-sky-300">
        © {new Date().getFullYear()} HACKHER
      </footer>
    </main>
  );
}
