import React, { useEffect } from "react";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title || "dialog"}
         className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
         onClick={onClose}>
      <div className="w-full max-w-xl rounded-xl glass p-4" onClick={(e) => e.stopPropagation()}>
        <header className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-sky-200">
            닫기
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
