// src/hooks/useTypewriter.js
import { useEffect, useState } from "react";

/* 주어진 text를 한 글자씩 타이핑해 주는 훅 */
export function useTypewriter(text, speed = 40) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");
    if (!text) return;

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return display;
}
