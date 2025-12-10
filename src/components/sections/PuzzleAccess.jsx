import React, { useState } from "react";

export default function PuzzleAccess() {
  const [frags, setFrags] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const add = (s) => setFrags((p) => (p.includes(s) ? p : [...p, s]));
  const bag = frags.length ? frags.join("-") : "—";

  const onSubmit = (e) => {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get("pass")?.toString().trim().toUpperCase();
    if (v === "HACKHER") { setMsg("ACCESS GRANTED"); setOpen(true); }
    else setMsg("ACCESS DENIED");
  };

  return (
    <section id="puzzle" className="min-h-svh px-6 py-16 flex flex-col justify-center gap-6">
      <header>
        <h2 className="text-2xl font-extrabold" style={{ color: "var(--neon-yellow)" }}>ACCESS NODE // 02</h2>
        <p className="text-sky-300/70">오브젝트를 눌러 단서를 모으고 암호를 입력하세요.</p>
      </header>

      <div className="relative h-[46svh] min-h-[320px] overflow-hidden rounded-2xl glass shadow-[0_0_0_1px_rgba(255,255,255,.06)]">
        {[
          { s: "HA", x: "12%", y: "42%" },
          { s: "CK", x: "46%", y: "28%" },
          { s: "HER", x: "78%", y: "62%" },
        ].map(({ s, x, y }) => (
          <button
            key={s}
            onClick={() => add(s)}
            style={{ left: x, top: y }}
            className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 text-[color:var(--neon-pink)] transition-transform hover:-translate-y-2 focus-visible:outline focus-visible:outline-2"
            aria-label={`단서 ${s}`}
          >
            ▣
          </button>
        ))}
        <div className="absolute right-2 bottom-2 rounded-full glass px-3 py-1 text-[12px] text-cyan-200">
          단서: {bag}
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-3">
        <label htmlFor="pass" className="text-slate-300/80 text-sm">암호</label>
        <input
          id="pass"
          name="pass"
          placeholder="단서를 조합해 입력"
          className="min-w-[220px] flex-1 rounded-lg border border-white/10 bg-[#03070b] px-3 py-2 text-slate-100"
        />
        <button className="rounded-xl px-4 py-2 font-bold" style={{ background: "var(--neon-green)", color: "#00110b" }}>
          UNLOCK
        </button>
        <output className="min-w-[120px] text-slate-400">{msg}</output>
      </form>

      {open && (
        <div className="mt-3 text-6xl font-black tracking-wider">
          <span className="neon-text" style={{ color: "var(--neon-green)" }}>HACK</span>
          <span className="neon-text" style={{ color: "var(--signal-red)" }}>HER</span>
        </div>
      )}
    </section>
  );
}
