// src/components/sections/PuzzleAccess.jsx

import React, { useState } from "react";
import "../../styles/puzzle-access.css";

// 아티팩트 메타 정보
const ARTIFACTS = [
  {
    id: "game",
    letter: "B",
    label: "GAME MODULE",
    title: "zzo가 가장 좋아하는 게임 컨트롤러",
    description: "밤새도록 레벨을 밀어버릴 때 사용하는 비밀 장비.",
    svg: "/src/assets/svg/puzzle_game.svg",
  },
  {
    id: "book",
    letter: "O",
    label: "BOOK CORE",
    title: "zzo의 사적인 세계가 담긴 책",
    description: "현실에서 로그아웃하고 새로운 서사를 흡수할 때 펼친다.",
    svg: "/src/assets/svg/puzzle_book.svg",
  },
  {
    id: "centipede",
    letter: "O",
    label: "CENTIPEDE SPECIMEN",
    title: "zzo가 이상할 정도로 좋아하는 지네",
    description: "완벽하게 쪼개진 관절과 움직임, 그리고 약간의 광기.",
    svg: "../src/assets/svg/centipede_pixel.svg",
  },
];

/*
  PuzzleAccess
  - 왼쪽: 아티팩트 카드 3개
  - 오른쪽: 스캔 슬롯 (드래그 & 드롭)
  - 아래: 드러나는 힌트 3개 + 정답 입력
  - 정답이 "boo" 이면 onSolved() 호출
*/
export default function PuzzleAccess({ onSolved }) {
  const [currentScan, setCurrentScan] = useState(null);       // 최근 스캔된 아티팩트 id
  const [revealed, setRevealed] = useState([]);              // 이미 힌트를 공개한 아티팩트 id 배열
  const [answer, setAnswer] = useState("");                  // 정답 입력값
  const [unlocked, setUnlocked] = useState(false);           // 퍼즐 해제 여부
  const [error, setError] = useState("");                    // 오답 메시지

  // 드래그 시작
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  // 드롭 허용
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 드롭 처리
  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;

    setCurrentScan(id);

    setRevealed((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );

    setError("");
  };

  // 정답 입력 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = answer.trim().toLowerCase();

    if (trimmed === "boo") {
      setUnlocked(true);
      setError("");
      if (typeof onSolved === "function") {
        onSolved();
      }
    } else {
      setError("ACCESS DENIED — wrong keyword");
    }
  };

  // 해당 아티팩트의 힌트 텍스트 생성
  const getHintFor = (id) => {
    const artifact = ARTIFACTS.find((a) => a.id === id);
    if (!artifact) return "";

    if (artifact.id === "game") {
      return `Hint #1: 첫 글자는 [${artifact.letter}] — 게임을 시작할 때 눌러야 하는 키처럼, 퍼즐의 시작을 여는 글자.`;
    }
    if (artifact.id === "book") {
      return `Hint #2: 두 번째 글자는 [${artifact.letter}] — 책장을 넘길 때마다 반복해서 마주치는 모양.`;
    }
    if (artifact.id === "centipede") {
      return `Hint #3: 마지막 글자도 [${artifact.letter}] — 지네의 무수한 마디처럼, 끝까지 이어지는 반복되는 글자.`;
    }
    return "";
  };

  // 글자 강조용 helper
  const highlightLetter = (text, letter) => {
    const parts = text.split(letter);
    return (
      <>
        {parts.map((p, idx) => (
          <React.Fragment key={idx}>
            {p}
            {idx < parts.length - 1 && (
              <span className="hint-letter">{letter}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section
      id="puzzle"
      className="puzzle-access-section"
      aria-label="Puzzle access — boo keyword"
    >
      {/* 헤더영역: 방탈출 상단 패널 느낌 */}
      <header className="puzzle-header">
        <div className="puzzle-chip-left font-mono-accent">
          <span className="chip-dot chip-dot--red" />
          <span className="chip-dot chip-dot--yellow" />
          <span className="chip-dot chip-dot--green" />
          <span className="chip-label">PUZZLE ACCESS // zzo LOCK</span>
        </div>
        <div className="puzzle-chip-right font-mono-accent">
          <span className="chip-tag">LEVEL 01</span>
          <span className="chip-tag chip-tag--armed">
            {unlocked ? "STATUS: UNLOCKED" : "STATUS: SEALED"}
          </span>
        </div>
      </header>

      {/* 메인 레이아웃 */}
      <div className="puzzle-body">
        {/* 왼쪽: 아티팩트 리스트 */}
        <div className="puzzle-artifacts">
          {ARTIFACTS.map((item) => (
            <button
              key={item.id}
              className="artifact-card"
              draggable={!unlocked}
              onDragStart={(e) => handleDragStart(e, item.id)}
              type="button"
            >
              <div className="artifact-label font-mono-accent">
                {item.label}
              </div>
              <div className="artifact-visual">
                {/* 실제에선 svg import 해서 사용해도 됨 */}
                <img
                  src={item.svg}
                  alt={item.title}
                  className="artifact-svg"
                />
              </div>
              <div className="artifact-meta">
                <h3 className="artifact-title font-m42">
                  {item.title}
                </h3>
                <p className="artifact-desc font-mono-accent">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* 오른쪽: SCAN 슬롯 */}
        <div className="puzzle-scan-area">
          <div className="scan-frame">
            <div className="scan-header font-mono-accent">
              <span className="scan-title">SCAN PORT</span>
              <span className="scan-id">slot-zz0x01</span>
            </div>

            {/* 실제 드롭존 */}
            <div
              className={[
                "scan-dropzone",
                currentScan ? "scan-dropzone--active" : "",
                unlocked ? "scan-dropzone--unlocked" : "",
              ].join(" ")}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* 스캔 라이트 애니메이션 오버레이 */}
              <div className="scan-beam" />
              <div className="scan-inner-border" />

              <div className="scan-placeholder font-mono-accent">
                {!currentScan && !unlocked && (
                  <>
                    <span className="scan-placeholder-main">
                      Drag an artifact here to SCAN
                    </span>
                    <span className="scan-placeholder-sub">
                      분석하고 싶은 물건을 집어서 이 영역에 올려 놓으세요.
                    </span>
                  </>
                )}
                {currentScan && !unlocked && (
                  <>
                    <span className="scan-placeholder-main">
                      Scanning {currentScan}...
                    </span>
                    <span className="scan-placeholder-sub">
                      힌트가 아래 영역에 추가되었습니다.
                    </span>
                  </>
                )}
                {unlocked && (
                  <span className="scan-placeholder-main scan-placeholder-main--unlocked">
                    ACCESS GRANTED — YOU MAY SCROLL
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 힌트 + 정답 입력 */}
          <div className="puzzle-hints">
            <div className="puzzle-hints-list">
              {ARTIFACTS.map((item) => {
                if (!revealed.includes(item.id)) return null;
                const raw = getHintFor(item.id);
                // 첫 번째 등장하는 letter만 하이라이트 분해
                const [before, ...rest] = raw.split(`[${item.letter}]`);
                const recomposed = (
                  <>
                    {before}
                    <span className="hint-letter">{item.letter}</span>
                    {rest.join(item.letter)}
                  </>
                );

                return (
                  <div
                    key={item.id}
                    className="hint-row font-mono-accent"
                  >
                    {recomposed}
                  </div>
                );
              })}
              {/* 아직 아무 힌트도 없을 때 안내 */}
              {revealed.length === 0 && (
                <div className="hint-row hint-row--empty font-mono-accent">
                  아직 어떤 물건도 스캔되지 않았습니다. 왼쪽 아티팩트를 하나 선택해 SCAN 영역으로 드래그하세요.
                </div>
              )}
            </div>

            <form className="puzzle-answer-form" onSubmit={handleSubmit}>
              <label className="font-mono-accent puzzle-answer-label">
                Combine all hints and enter the keyword:
              </label>
              <div className="puzzle-answer-input-row">
                <span className="answer-prefix font-mono-accent">$</span>
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="puzzle-answer-input font-m42"
                  placeholder="type the 3-letter keyword"
                  disabled={unlocked}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="puzzle-answer-button font-mono-accent"
                  disabled={unlocked}
                >
                  RUN
                </button>
              </div>
              <div className="puzzle-answer-status font-mono-accent">
                {!unlocked && !error && (
                  <span className="status-hint">
                    힌트 3개를 모두 조합하면 zzo를 여는 키워드가 보입니다.
                  </span>
                )}
                {error && (
                  <span className="status-error">
                    {error}
                  </span>
                )}
                {unlocked && (
                  <span className="status-success">
                    Puzzle unlocked. You can now scroll to the next layer.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
