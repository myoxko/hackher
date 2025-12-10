// src/App.jsx

import React, { useEffect, useState } from "react";

import SplashIntroPixel from "./components/ui/SplashIntroPixel.jsx";
import LoadingZzo from "./components/ui/LoadingZzo.jsx";

import HeroTerminal from "./components/sections/HeroTerminal.jsx";
import PuzzleAccess from "./components/sections/PuzzleAccess.jsx";
import FeedAbout from "./components/sections/FeedAbout.jsx";
import ProjectsExplorer from "./components/sections/ProjectsExplorer.jsx";
import ContactScratch from "./components/sections/ContactScratch.jsx";

const PHASES = {
  INTRO: "intro",
  LOADING: "loading",
  MAIN: "main",
};

export default function App() {
  const [phase, setPhase] = useState(PHASES.INTRO);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  /* ---------------------------------------------------------
     다크모드 강제
     --------------------------------------------------------- */
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  /* ---------------------------------------------------------
     puzzleSolved 변화 시 스크롤 잠금/해제
     퍼즐 풀기 전: 스크롤 불가
     퍼즐 풀면: 스크롤 정상
     --------------------------------------------------------- */
  useEffect(() => {
    if (!puzzleSolved) {
      document.body.style.overflow = "hidden"; // 스크롤 막기
    } else {
      document.body.style.overflow = "auto"; // 스크롤 풀기
    }

    return () => {
      document.body.style.overflow = "auto"; // 클린업
    };
  }, [puzzleSolved]);

  return (
    <>
      {phase === PHASES.INTRO && (
        <SplashIntroPixel onFinish={() => setPhase(PHASES.LOADING)} />
      )}

      {phase === PHASES.LOADING && (
        <LoadingZzo onComplete={() => setPhase(PHASES.MAIN)} />
      )}

      <main
        className={[
          "min-h-svh",
          "bg-[radial-gradient(1200px_800px_at_70%_-10%,#0d1520_0%,#070a0e_60%,#05070a_100%)]",
          "text-slate-100",
          "transition-opacity duration-700",
          phase === PHASES.MAIN ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {/* 1) 터미널 (애니메이션 나오고 클릭 진행 버전) */}
        <HeroTerminal />

        {/* 2) PuzzleAccess — 크기 고정: 화면 전체 영역 차지 */}
        <PuzzleAccess onSolved={() => setPuzzleSolved(true)} />

        {/* 3) 퍼즐 풀기 전에는 아래 섹션이 안 보이고 스크롤 불가 */}
        {puzzleSolved && (
          <>
            <FeedAbout />
            <ProjectsExplorer />
            <ContactScratch />
            <footer className="py-8 text-center text-sky-300">
              © {new Date().getFullYear()} HACKHER
            </footer>
          </>
        )}
      </main>
    </>
  );
}
