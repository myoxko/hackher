import React, { useState } from "react";
import Modal from "../ui/Modal.jsx";

const FOLDERS = [
  { title: "Lunar Forest", desc: "스크롤-위상 시네틱" },
  { title: "Pixel Cursor Suite", desc: "포인터/텍스트/로딩" },
  { title: "Specimen Lab", desc: "카드 표본 시스템" },
  { title: "Radio Quiet", desc: "주파수 신호 UX" },
];

export default function ProjectsExplorer() {
  const [modal, setModal] = useState(null);

  return (
    <section id="projects" className="min-h-svh px-6 py-16 flex flex-col justify-center gap-6">
      <header>
        <h2 className="text-2xl font-extrabold" style={{ color: "var(--neon-yellow)" }}>LOCAL FILES // 04</h2>
        <p className="text-sky-300/70">좌우 스크롤(스냅)로 폴더 탐색</p>
      </header>

      <div className="grid auto-cols-[minmax(220px,30vw)] grid-flow-col gap-3 overflow-auto rounded-2xl glass p-3 [scroll-snap-type:x_mandatory]">
        {FOLDERS.map((f) => (
          <article key={f.title} className="[scroll-snap-align:start] flex flex-col gap-2 rounded-xl glass p-4">
            <div className="h-28 rounded-lg border border-white/10 bg-gradient-to-b from-black/20 to-black/40 shadow-[inset_0_0_140px_rgba(0,255,102,.12)]" />
            <h3 className="text-base font-extrabold" style={{ color: "var(--neon-yellow)" }}>{f.title}</h3>
            <p className="m-0 text-slate-300/80">{f.desc}</p>
            <button
              onClick={() => setModal({ title: f.title, body: `${f.title} — 네온·다크웹 무드 상호작용 샘플.` })}
              className="mt-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sky-200"
            >
              열기
            </button>
          </article>
        ))}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title}>
        <p className="text-slate-200">{modal?.body}</p>
        <p className="text-slate-400 mt-2">• Stack: Canvas/SVG, Scroll Snap, A11y</p>
      </Modal>
    </section>
  );
}
