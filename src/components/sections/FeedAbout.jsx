import React from "react";

// 이미지 임포트
import feed1 from './feed1.svg';
import feed2 from './feed2.svg';
import feed3 from './feed3.svg';
import feed4 from './feed4.svg';
import feed5 from './feed5.svg';
import feed6 from './feed6.svg';
import feed7 from './feed7.svg';

// URL
const imageLinks = [
  "https://myoxko.github.io/react-portfolio/",
  "https://www.youtube.com/watch?v=SHVqPciE4n4&feature=youtu.be",
  "https://myoxko.github.io/windrainows24/",
  "https://myoxko.github.io/music",
  "https://myoxko.github.io/game",
  "https://myoxko.github.io/mind-seed/",
  "https://myoxko.github.io/studywithme/",
];

export default function FeedAbout() {
  // 이미지 배열
  const cardImages = [feed1, feed2, feed3, feed4, feed5, feed6, feed7];

  return (
    <section
      id="about"
      className="min-h-screen px-6 py-16 flex flex-col justify-center gap-0 overflow-hidden bg-[#1a0507]"
    >
      <header>
        <h2 className="text-2xl font-extrabold text-red-500">PROFILE FEED // 03</h2>
        <p className="text-gray-300/70">Decrypted feeds are streamed below.</p>
      </header>

      {/* 이미지 나열, 이미지 간 간격을 0으로 설정 */}
      <div className="flex flex-col items-center gap-0">
        {cardImages.map((image, index) => (
          <div
            key={index}
            className="relative flex justify-center items-center w-[70vw] h-[70vw] group"
          >
            <a href={imageLinks[index]} target="_blank" rel="noopener noreferrer">
              <img
                src={image}
                alt={`Feed card ${index}`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
