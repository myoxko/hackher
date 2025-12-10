// src/components/ui/ParticleBackground.jsx

import React from "react";
import "../../styles/particles.css";

/* 픽셀 느낌의 파티클 배경 레이어 */
export default function ParticleBackground() {
  return (
    <div className="particle-layer">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="particle-dot" />
      ))}
    </div>
  );
}
