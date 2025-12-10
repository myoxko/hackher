import React, { useEffect, useMemo, useState } from "react";
import { useInView } from 'react-intersection-observer';

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
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setList((prev) => (i < items.length ? [...prev, items[i++]] : prev));
      if (i >= items.length) clearInterval(timer);
    }, 520);
    return () => clearInterval(timer);
  }, [items]);

  const cardImages = [
    '/assets/svg/PEED1.svg',
    '/assets/svg/PEED2.svg',
    '/assets/svg/PEED3.svg',
    '/assets/svg/PEED4.svg',
    '/assets/svg/PEED5.svg',
    '/assets/svg/PEED6.svg',
    '/assets/svg/PEED7.svg',
  ];

  return (
    <section
      id="about"
      className="min-h-svh px-6 py-16 flex flex-col justify-center gap-6"
    >
      <header>
        <h2
          className="text-2xl font-extrabold"
          style={{ color: "var(--neon-pink)" }}
        >
          PROFILE FEED // 03
        </h2>
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
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[12px] text-sky-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* 카드 이미지 애니메이션 */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {cardImages.map((image, index) => (
            <CardImage
              key={index}
              image={image}
              index={index}
              showCards={showCards}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 카드 이미지 컴포넌트
function CardImage({ image, index, showCards }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // 한 번만 애니메이션 실행
    threshold: 0.5, // 50% 이상 보일 때
  });

  const angle = Math.random() * 15 - 7.5; // -7.5 ~ 7.5도 사이의 랜덤 각도
  const yOffset = 100 * index + 100; // 카드가 하나씩 쌓이도록 설정

  return (
    <div
      ref={ref}
      className={`absolute left-1/2 transform -translate-x-1/2 transition-transform duration-1000 ease-in-out`}
      style={{
        bottom: `-${yOffset}px`,
        opacity: inView ? 1 : 0,
        transform: inView ? `translateY(${yOffset}px) rotate(${angle}deg)` : 'translateY(0) rotate(0deg)',
        transition: inView ? 'transform 1s, opacity 1s' : 'none'
      }}
    >
      <img src={image} alt={`Feed card ${index}`} className="w-[80px] sm:w-[120px]" />
    </div>
  );
}
