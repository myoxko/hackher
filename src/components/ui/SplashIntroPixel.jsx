// src/components/ui/SplashIntroPixel.jsx

import React, { useEffect } from "react";
import "../../styles/intro.css";
import LogoHackher from "./LogoHackher";

export default function SplashIntroPixel({ onFinish }) {

  // 4~5초 뒤 인트로 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro-wrapper flex items-center justify-center w-full h-full">
      <LogoHackher />
    </div>
  );
}
