import React, { useEffect, useState } from "react";

// 핵심: 5초간 재생되는 SVG 애니메이션
export default function SplashSVG({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHide(true), 4500);
    const finishTimer = setTimeout(() => onFinish && onFinish(), 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-[60] transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <svg
        width="480"
        height="480"
        viewBox="0 0 480 480"
        className="drop-shadow-[0_0_35px_rgba(255,0,50,0.6)]"
      >
        <defs>
          <filter id="glitch">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <radialGradient id="coreGrad">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="60%" stopColor="#990000" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>

        {/* 외곽 붉은 링 */}
        <circle
          cx="240"
          cy="240"
          r="180"
          stroke="#ff1f1f"
          strokeWidth="3"
          fill="none"
          strokeDasharray="1130"
          strokeDashoffset="1130"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1130"
            to="0"
            dur="1.5s"
            fill="freeze"
            begin="0s"
          />
        </circle>

        {/* 두 번째 회로 레이어 */}
        <circle
          cx="240"
          cy="240"
          r="140"
          stroke="#ff7373"
          strokeWidth="2"
          fill="none"
          strokeDasharray="880"
          strokeDashoffset="880"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="880"
            to="0"
            dur="1.8s"
            fill="freeze"
            begin="0.2s"
          />
        </circle>

        {/* 내부 회로 패스 */}
        <circle
          cx="240"
          cy="240"
          r="95"
          stroke="#ff2929"
          strokeWidth="2"
          fill="none"
          strokeDasharray="600"
          strokeDashoffset="600"
          filter="url(#glitch)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="600"
            to="0"
            dur="1.8s"
            begin="0.5s"
            fill="freeze"
          />
        </circle>

        {/* 중심 코어 */}
        <circle cx="240" cy="240" r="40" fill="url(#coreGrad)">
          <animate
            attributeName="r"
            values="40;50;42;50;38;40"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* 포털 확장·전체 흡수 */}
        <circle
          cx="240"
          cy="240"
          r="60"
          fill="black"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;1"
            dur="5s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="r"
            values="60;60;2000"
            dur="5s"
            begin="0s"
            fill="freeze"
          />
        </circle>
      </svg>

      {/* 중앙 접근 텍스트 */}
      <div className="absolute text-red-500 text-center tracking-[0.3em] font-m42 text-[1.1rem]">
        ACCESSING DARK WEB
      </div>
    </div>
  );
}
