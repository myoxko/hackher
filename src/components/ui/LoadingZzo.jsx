// src/components/ui/LoadingZzo.jsx
//-------------------------------------------------------
// zzo 7단계 로딩 애니메이션
// - 픽셀 손/심장 SVG
// - 클릭할 때마다 단계 progression
// - 단계별 문구 타이핑
// - 파티클 + 글리치 + hover 효과
//-------------------------------------------------------

import React, { useEffect, useState } from "react";
import "../../styles/loading.css";

/* 손 · 심장 SVG (assets/svg) */
import HandOpen from "../../assets/svg/zzo_hand_open.svg";
import HandClosed from "../../assets/svg/zzo_hand_closed.svg";
import Heart from "../../assets/svg/zzo_heart.svg";

/* 타이핑 훅 */
import { useTypewriter } from "../../hooks/useTypewriter";

/* 파티클 배경 */
import ParticleBackground from "./ParticleBackground.jsx";

/* 7단계 텍스트 */
const LOADING_TEXTS = [
  "zzo가 접근을 시도하고 있습니다…",
  "zzo가 당신의 마음을 발견했습니다.",
  "심장 반응 감지…",
  "zzo가 당신의 마음에 손을 뻗습니다…",
  "zzo가 당신의 마음을 움켜쥐었습니다.",
  "zzo가 당신의 마음을 훔쳤습니다.",
  "zzo는 누구인가? — ACCESS GRANTED",
];

export default function LoadingZzo({ onComplete }) {
  /* step: 0~6 */
  const [step, setStep] = useState(0);

  /* hover 효과 */
  const [hover, setHover] = useState(false);

  /* 현재 단계 문구 타이핑 */
  const typedMain = useTypewriter(LOADING_TEXTS[step], 36);

  /* 클릭 이벤트 */
  const handleClick = () => {
    if (step < 6) {
      setStep(step + 1);
      return;
    }

    // step === 6 → 액세스 허용 후 메인 페이지 진입
    setTimeout(() => {
      if (typeof onComplete === "function") onComplete();
    }, 1100);
  };

  /* 첫 시작 시 효과음 */
  useEffect(() => {
    const audio = new Audio("/sounds/zzo_glitch.wav");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  return (
    <div
      className={[
        "loading-zzo-wrapper",
        hover ? "loading-zzo-wrapper--hover" : "",
        step === 6 ? "loading-zzo-wrapper--final" : "",
      ].join(" ")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      role="button"
      aria-label="zzo loading sequence"
    >
      {/* 파티클 레이어 */}
      <ParticleBackground />

      {/* 노이즈 오버레이 */}
      <div className="loading-zzo-overlay" />

      {/* 텍스트 영역 */}
      <div className="loading-zzo-text">
        <p className="loading-zzo-label font-mono-accent">loading zzo...</p>

        {/* 단계별 타이핑 문구 */}
        <p className="loading-zzo-main font-m42">{typedMain}</p>
      </div>

      {/* 손 + 심장 애니메이션 스테이지 */}
      <div className="loading-zzo-stage">

        {/* 열린 손 */}
        <img
          src={HandOpen}
          alt="open hand"
          className={[
            "loading-zzo-hand",
            "loading-zzo-hand--open",
            step <= 2 ? "is-visible" : "is-hidden",
            step === 3 ? "is-reaching" : "",
          ].join(" ")}
        />

        {/* 심장 */}
        <img
          src={Heart}
          alt="pixel heart"
          className={[
            "loading-zzo-heart",
            step >= 1 ? "is-visible" : "is-hidden",
            step === 2 ? "is-pulsing" : "",
            step === 3 ? "is-moving-to-hand" : "",
            step >= 4 ? "is-grabbed" : "",
          ].join(" ")}
        />

        {/* 주먹 쥔 손 */}
        <img
          src={HandClosed}
          alt="closed hand"
          className={[
            "loading-zzo-hand",
            "loading-zzo-hand--closed",
            step >= 4 ? "is-visible" : "is-hidden",
            step >= 5 ? "is-lifted" : "",
            step === 6 ? "is-glitching" : "",
          ].join(" ")}
        />
      </div>

      {/* 안내 문구 */}
      <div className="loading-zzo-hint font-mono-accent">
        클릭할 때마다 zzo의 행동이 한 단계씩 진행됩니다.
      </div>
    </div>
  );
}
