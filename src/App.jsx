// src/App.jsx
import React, { useEffect, useState } from "react";
import "./styles/scrollbar.css";

/* 인트로 픽셀 스플래시 */
import SplashIntroPixel from "./components/ui/SplashIntroPixel.jsx";

/* zzo 로딩 (심장 + 손 픽셀 스테이지) */
import LoadingZzo from "./components/ui/LoadingZzo.jsx";

/* 사이트 섹션 */
import HeroTerminal from "./components/sections/HeroTerminal.jsx";
import PuzzleAccess from "./components/sections/PuzzleAccess.jsx";
import FeedAbout from "./components/sections/FeedAbout.jsx";
import ProjectsExplorer from "./components/sections/ProjectsExplorer.jsx";
import ContactScratch from "./components/sections/ContactScratch.jsx";

const PHASE = {
  INTRO: "intro",
  LOADING: "loading",
  MAIN: "main",
};

export default function App() {
  const [phase, setPhase] = useState(PHASE.INTRO);

  /* 다크모드 항상 ON */
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      {/* 1단계 — 픽셀 스플래시 (자동 5초 후 종료) */}
      {phase === PHASE.INTRO && (
        <SplashIntroPixel onFinish={() => setPhase(PHASE.LOADING)} />
      )}

      {/* 2단계 — 손 + 심장 픽셀 애니메이션 (CLICK 진행) */}
      {phase === PHASE.LOADING && (
        <LoadingZzo onComplete={() => setPhase(PHASE.MAIN)} />
      )}

      {/* 3단계 — 메인 콘텐츠 */}
      <main
        className={[
          "min-h-svh",
          "bg-[radial-gradient(circle_at_center,#091015,#05070a_80%)]",
          "text-slate-100",
          "transition-opacity duration-700",
          phase === PHASE.MAIN ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <HeroTerminal />
        <PuzzleAccess />
        <FeedAbout />
        <ProjectsExplorer />
        <ContactScratch />

        <footer className="py-8 text-center text-sky-300">
          © {new Date().getFullYear()} HACKHER
        </footer>
      </main>
    </>
  );
}
