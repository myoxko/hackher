// src/components/sections/PuzzleAccess.jsx

import React, { useState } from "react";
import "../../styles/puzzle-access.css";

/* 픽셀 SVG */
import Pad from "../../assets/svg/game_pad_pixel.svg";
import Book from "../../assets/svg/book_pixel.svg";
import Centipede from "../../assets/svg/centipede_pixel.svg";

/* 각 아이템에 대응하는 힌트 */
const HINT_MAP = {
  Pad: "첫 번째 키는 B",
  Book: "두 번째 키는 O",
  Centipede: "마지막 키는 O",
};

export default function PuzzleAccess({ onUnlock }) {
  const [scanned, setScanned] = useState([]);
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  /* 드롭 시 처리 */
  const onDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/item");
    if (!item || scanned.includes(item)) return;

    setScanned((prev) => [...prev, item]);
  };

  const onDrag = (e, item) => {
    e.dataTransfer.setData("text/item", item);
  };

  /* 정답 검사 */
  const checkAnswer = () => {
    if (input.toLowerCase() === "boo") {
      setUnlocked(true);
      if (typeof onUnlock === "function") onUnlock();
    }
  };

  return (
    <section id="puzzle" className="puzzle-wrapper">
      <h2 className="puzzle-title">SCAN & UNLOCK ACCESS</h2>

      {/* 아이템 영역 */}
      <div className="puzzle-items">
        <img draggable className="puzzle-item" src={Pad}
          onDragStart={(e) => onDrag(e, "Pad")} />

        <img draggable className="puzzle-item" src={Book}
          onDragStart={(e) => onDrag(e, "Book")} />

        <img draggable className="puzzle-item" src={Centipede}
          onDragStart={(e) => onDrag(e, "Centipede")} />
      </div>

      {/* 스캔 영역 */}
      <div className="puzzle-scan"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="scan-label">SCAN AREA</div>

        {/* 스캔된 힌트 출력 */}
        <div className="scan-hints">
          {scanned.map((k) => (
            <p key={k} className="scan-hint">{HINT_MAP[k]}</p>
          ))}
        </div>
      </div>

      {/* 정답 입력창: 3개 모두 스캔해야 활성화 */}
      <div className="puzzle-input-area">
        <input
          disabled={scanned.length !== 3}
          className="puzzle-input"
          placeholder="Enter key..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="puzzle-submit"
          disabled={scanned.length !== 3}
          onClick={checkAnswer}
        >
          VERIFY
        </button>
      </div>

      {unlocked && (
        <p className="puzzle-unlocked">ACCESS GRANTED — scroll to continue</p>
      )}
    </section>
  );
}
