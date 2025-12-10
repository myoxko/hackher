import React, { useEffect, useRef } from "react";

export default function ContactScratch() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const paintCover = () => {
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = 340);
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(7,12,18,.88)");
      g.addColorStop(1, "rgba(5,8,12,.92)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // 네온 안내
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--neon-yellow") || "#f5ff00";
      ctx.font = "800 20px var(--font-grotesk)";
      ctx.shadowColor = "rgba(245,255,0,.35)";
      ctx.shadowBlur = 12;
      ctx.fillText("SCRATCH TO REVEAL →", 22, 42);
      ctx.shadowBlur = 0;
    };

    const revealAt = (x, y) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      const px = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const py = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      return { x: px, y: py };
    };

    let drawing = false;
    const down = (e) => { drawing = true; const { x, y } = pos(e); revealAt(x, y); };
    const move = (e) => { if (drawing) { const { x, y } = pos(e); revealAt(x, y); } };
    const up = () => { drawing = false; };

    paintCover();
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("resize", paintCover);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("resize", paintCover);
    };
  }, []);

  return (
    <section
      id="contact"
      className="min-h-svh px-6 py-16 flex flex-col justify-center gap-6 bg-[#1a0507]"
    >
      {/* 제목 */}
      <header className="flex justify-between items-center w-full max-w-[1040px] mx-auto">
        <div className="puzzle-chip-left font-mono-accent">
          <span className="chip-dot chip-dot--red" />
          <span className="chip-dot chip-dot--yellow" />
          <span className="chip-dot chip-dot--green" />
          <span className="chip-label">CONTACT SCRATCH</span>
        </div>
        <div className="puzzle-chip-right font-mono-accent">
          <span className="chip-tag">LEVEL END</span>
          <span className="chip-tag chip-tag--armed">
            CONTACT
          </span>
        </div>
      </header>

      <div className="relative mx-auto w-full max-w-3xl">
        {/* 뒤 카드(드러날 정보) */}
        <div className="absolute inset-0 grid place-items-center rounded-2xl glass text-center text-cyan-50">
          <div className="p-6">
            <h3 className="text-3xl font-extrabold neon-text" style={{ color: "var(--neon-green)" }}>myoxko</h3>
            <p className="opacity-90">designer / coder / explorer</p>
            <p className="mt-2">
              <a className="underline" href="mailto:meyrrill@gmail.com">meyrrill@gmail.com</a>
            </p>
            <p>@myoxko</p>
          </div>
        </div>

        {/* 긁을 오버레이 */}
        <canvas
          ref={canvasRef}
          className="relative z-10 block w-full rounded-2xl border border-white/10"
          height={340}
        />
      </div>
    </section>
  );
}
