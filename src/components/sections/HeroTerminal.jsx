// src/components/sections/HeroTerminal.jsx

import React, { useEffect, useRef, useState } from "react";

export default function HeroTerminal() {
  const outRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  /* -----------------------------------------------------------
     터미널에 표시할 한 줄 단위 시나리오
     (클릭할 때마다 한 줄씩 추가)
  ----------------------------------------------------------- */
  const lines = [
    "> Starting emotional scan...",
    "> Analyzing data: signal of excitement detected.",
    "> Searching for emotional source...",
    "> Identified emotional trigger: zzo.",
    "> Abnormal condition detected: heart rate rising.",
    "> Conclusion: zzo has stolen your heart.",

    "> Initiating target information retrieval...",
    "> Classified data related to zzo discovered.",
    "> Charm index extremely high.",
    "> Access level insufficient: starting hack procedure.",

    "> Tracing zzo activity route...",
    "> Firewall bypass successful.",
    "> Security module infiltration complete.",

    "> Locking on zzo. Preparing deep hack...",
  ];

  /* 현재 몇 번째 줄까지 보여줄지 (0부터 시작, 1줄씩 증가) */
  const [visibleCount, setVisibleCount] = useState(1); // 첫 번째 멘트는 바로 보이게
  /* 모든 줄이 다 나왔는지 여부 */
  const isFinished = visibleCount >= lines.length;

  /* -----------------------------------------------------------
     특정 단어들을 빨간색으로 하이라이트하는 헬퍼 함수
     - zzo, heart, hack, bypass, infiltration, excitement
  ----------------------------------------------------------- */
  const highlightWords = (text) => {
    // i 플래그로 대소문자 무시
    const pattern =
      /(zzo|heart|hack|bypass|infiltration|excitement)/gi;
    const parts = text.split(pattern);

    return parts.map((part, idx) => {
      if (pattern.test(part.toLowerCase())) {
        return (
          <span key={idx} className="text-red-400 font-semibold">
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  /* -----------------------------------------------------------
     클릭 시 한 줄씩 추가
     - 마지막 줄까지 도달하면 더 이상 증가하지 않음
  ----------------------------------------------------------- */
  const handleAdvance = () => {
    setVisibleCount((prev) =>
      prev < lines.length ? prev + 1 : prev
    );
  };

  /* -----------------------------------------------------------
     네온 레드 파티클 배경
  ----------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = Math.max(
      1,
      Math.min(2, window.devicePixelRatio || 1)
    );

    const resize = () => {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
    };

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth * DPR,
      y: Math.random() * window.innerHeight * DPR,
      r: 0.6 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    let raf;
    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,0,80,.85)";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* -----------------------------------------------------------
     스크롤 잠금 / 해제
     - 모든 줄이 나오기 전까지 body 스크롤 비활성화
  ----------------------------------------------------------- */
  useEffect(() => {
    if (!isFinished) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    } else {
      // 모두 끝나면 스크롤 가능
      document.body.style.overflow = "";
    }
  }, [isFinished]);

  /* -----------------------------------------------------------
     터미널 입력 처리 (기본 기능은 유지)
  ----------------------------------------------------------- */
  const onSubmit = (e) => {
    e.preventDefault();
    const v = inputRef.current.value.trim();
    const out = outRef.current;
    if (!out) return;

    out.scrollTop = out.scrollHeight;

    // 여기서는 실제 출력 대신, 단순 로그만 추가
    // (실제 커맨드 결과가 필요 없으면 이 부분 최소화 가능)
    if (v) {
      out.dataset.extra = `${(out.dataset.extra || "")}\n$ ${v}`;
    }

    inputRef.current.value = "";
  };

  /* -----------------------------------------------------------
     렌더링
  ----------------------------------------------------------- */
  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center justify-center overflow-hidden px-6 py-10"
    >
      {/* CRT 스캔라인 오버레이 */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(255,0,0,.1)_2px_3px)] mix-blend-soft-light opacity-50" />

      <div className="relative z-10 w-full max-w-4xl rounded-2xl glass-strong">
        {/* 상단 패널 */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[color:var(--panel-2)] px-4 py-2 text-xs font-bold tracking-wider text-red-300">
          <span
            className="size-2.5 rounded-full"
            style={{ background: "red" }}
          />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="ml-auto text-red-400">
            darknet://access
          </span>
        </div>

        {/* 출력창: 클릭 시 다음 줄로 진행 */}
        <div
          ref={outRef}
          onClick={handleAdvance}
          className="hero-terminal-output h-[36svh] max-h-[420px] whitespace-pre-wrap overflow-auto px-4 py-3 font-mono text-red-200 bg-gradient-to-b from-[#09121a] to-[#0b121a] cursor-pointer"
          aria-live="polite"
        >
          {lines.slice(0, visibleCount).map((line, idx) => (
            <div key={idx}>{highlightWords(line)}</div>
          ))}
        </div>

        {/* 입력 (겉모습만 유지, 필수는 아님) */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-white/10 bg-[color:var(--panel-2)] px-4 py-2"
        >
          <span className="text-red-400">$</span>
          <input
            ref={inputRef}
            placeholder="connect --handshake"
            className="w-full rounded-lg border border-white/10 bg-[#03070b] px-3 py-2 text-red-200 outline-none"
          />
        </form>

        {/* 모든 라인이 출력된 후에만 Scroll 표시 */}
        {isFinished && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[12px] text-red-300/80 flex items-center gap-1">
            <span>Scroll</span>
            <span className="animate-bounce">↓</span>
          </div>
        )}
      </div>

      {/* 파티클 캔버스 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </section>
  );
}
