// src/components/ui/SplashIntroPixel.jsx

import React, { useEffect, useState } from "react";
import "../../styles/intro.css";
import "../../styles/particles.css";

import Portal from "../../assets/svg/intro_portal.svg";
import Heart from "../../assets/svg/zzo_heart.svg";
import { useTypewriter } from "../../hooks/useTypewriter";

/*
  5초짜리 픽셀 인트로
  - 포털 SVG + 픽셀 심장
  - 하단에 코드가 타이핑되는 느낌
*/
const INTRO_LINES = [
  "initializing darknet access...",
  "routing onions through hidden nodes...",
  "searching for: zzo",
  "anomaly detected in HEART_CORE...",
  "opening channel to zzo..."
];

export default function SplashIntroPixel({ onFinish }) {
  const [lineIndex, setLineIndex] = useState(0);
  const typed = useTypewriter(INTRO_LINES[lineIndex], 35);

  /* 일정 간격으로 다음 문장으로 넘어감 */
  useEffect(() => {
    if (lineIndex >= INTRO_LINES.length - 1) return;
    const id = setTimeout(() => {
      setLineIndex((prev) => Math.min(prev + 1, INTRO_LINES.length - 1));
    }, 900);
    return () => clearTimeout(id);
  }, [lineIndex]);

  /* 전체 인트로 종료 타이머 */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro-wrapper">
      {/* 파티클 레이어 */}
      <div className="particle-layer">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="particle-dot" />
        ))}
      </div>

      {/* 포털 + 심장 SVG */}
      <div className="intro-portal">
        <img src={Portal} alt="portal" className="intro-portal-svg" />
        <img src={Heart} alt="pixel heart" className="intro-heart-svg" />
      </div>

      {/* 타이핑 텍스트 */}
      <div className="intro-text font-mono-accent">
        <p className="intro-label">connecting to zzo...</p>
        <p className="intro-code">{typed}</p>
      </div>
    </div>
  );
}
