// src/components/ui/ZzoReveal.jsx

import React, { useEffect } from "react";
import ZzoLogo from "./ZzoLogo.jsx";
import "../../styles/zzo-reveal.css";

/* zzo reveal 페이지
   - zzo 로고를 크게 보여주고
   - 짧은 문구 + 버튼/자동 전환으로 메인으로 넘어감
*/
export default function ZzoReveal({ onDone }) {
  useEffect(() => {
    /* 3초 후 자동으로 메인 화면으로 전환 */
    const timer = setTimeout(() => {
      if (typeof onDone === "function") onDone();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="zzo-reveal-wrapper">
      <div className="zzo-reveal-inner">
        <ZzoLogo size="lg" />

        <p className="zzo-reveal-line font-mono-accent">
          unknown entity &quot;zzo&quot; identified.
        </p>
        <p className="zzo-reveal-line font-mono-accent">
          heart-source compromised. redirecting to profile...
        </p>

        <button
          className="zzo-reveal-button font-m42"
          onClick={onDone}
          type="button"
        >
          ENTER ZZO&apos;S WORLD
        </button>
      </div>
    </div>
  );
}
