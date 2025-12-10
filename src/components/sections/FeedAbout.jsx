import React, { useEffect, useMemo, useState } from "react";

export default function FeedAbout() {
  const items = useMemo(
    () => [
      { t: "ABOUT", c: "느낌보다 개념을 먼저 통과시키는 사람. 질서 × 혼돈." },
      { t: "STACK", c: "JS/TS · Canvas · SVG · CSS · A11y · Perf" },
      { t: "MUSIC", c: "Metal / Doom / Alt, nightly playlists" },
      { t: "LIKES", c: "곤충(지네), 공포게임, B급 고어 미디어 분석" },
      { t: "PHILOSOPHY", c: "작고 확정적인 제안 · 선택권 · 꾸준함" },
    ],
    []
  );
  const [list, setList] = useState([]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setList((prev) => (i < items.length ? [...prev, items[i++]] : prev));
      if (i >= items.length) clearInterval(timer);
    }, 520);
    return () => clearInterval(timer);
  }, [items]);

  return (
    <section id="about" className="min-h-svh px-6 py-16 flex flex-col justify-center gap-6">
      <header>
        <h2 className="text-2xl font-extrabold" style={{ color: "var(--neon-pink)" }}>PROFILE FEED // 03</h2>
        <p className="text-sky-300/70">디크립트된 피드가 아래로부터 스트림됩니다.</p>
      </header>
      <ul className="grid gap-3">
        {list.map((it, i) => (
          <li key={`${it.t}-${i}`} className="rounded-xl glass p-4">
            <div className="text-[12px] text-cyan-300">
              #{String(i + 1).padStart(2, "0")} • {it.t}
            </div>
            <div>{it.c}</div>
            {it.t === "STACK" && (
              <div className="mt-2 flex flex-wrap gap-2">
                {["Canvas", "SVG", "A11y", "Perf", "Pixel"].map((t) => (
                  <span key={t} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[12px] text-sky-200">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
