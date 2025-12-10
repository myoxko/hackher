import React, { useEffect, useRef } from "react";

export default function HeroTerminal() {
  const outRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  // 부팅 텍스트 타이핑
  useEffect(() => {
    const out = outRef.current;
    const lines = [
      "[boot] initializing darknet interface…",
      "[ok] entropy source: /dev/howl",
      "[ok] cipher suite: GIRL/WOLF-AES",
      '[hint] type "connect --handshake" and press Enter',
    ];
    let cancel = false;
    (async () => {
      for (const line of lines) {
        for (let i = 0; i < line.length; i++) {
          if (cancel) return;
          out.textContent += (i === 0 ? "\n" : "") + line[i];
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 18));
        }
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 220));
      }
    })();
    return () => { cancel = true; };
  }, []);

  // 네온 파티클
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
    };
    const ps = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth * DPR,
      y: Math.random() * window.innerHeight * DPR,
      r: 0.6 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));
    let raf;
    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,102,.9)"; // --neon-green
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };
    resize(); step();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const v = inputRef.current.value.trim();
    const out = outRef.current;
    out.textContent += `\n$ ${v}`;
    if (v.toLowerCase() === "connect --handshake") {
      out.textContent += "\n[ok] link established. scroll down ↓";
      out.scrollTop = out.scrollHeight;
    } else out.textContent += "\n[err] unknown command";
    inputRef.current.value = "";
  };

  return (
    <section id="hero" className="relative min-h-svh flex items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,.12)_2px_3px)] mix-blend-soft-light opacity-50" />
      <div className="relative z-10 w-full max-w-4xl rounded-2xl glass-strong">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[color:var(--panel-2)] px-4 py-2 text-xs font-bold tracking-wider text-[#7aa4bf]">
          <span className="size-2.5 rounded-full" style={{ background: "var(--neon-pink)" }} />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="ml-auto neon-text">darknet://access</span>
        </div>
        <pre
          ref={outRef}
          className="h-[36svh] max-h-[420px] whitespace-pre-wrap overflow-auto px-4 py-3 font-mono text-[#d7e9ff] bg-gradient-to-b from-[#09121a] to-[#0b121a]"
          aria-live="polite"
        />
        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 bg-[color:var(--panel-2)] px-4 py-2">
          <span style={{ color: "var(--neon-green)" }}>$</span>
          <input
            ref={inputRef}
            placeholder="connect --handshake"
            className="w-full rounded-lg border border-white/10 bg-[#03070b] px-3 py-2 outline-none [box-shadow:0_0_0_1px_#0d1a22_inset]"
            aria-label="명령 입력"
          />
        </form>
        <div className="absolute bottom-2 right-3 text-[12px] text-cyan-300/90">↓ scroll to enter</div>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </section>
  );
}
