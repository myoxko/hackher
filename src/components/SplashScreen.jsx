// src/components/SplashScreen.jsx

// React 불러옴. useEffect, useState 훅 사용함
import React, { useEffect, useState } from "react";

// 다크웹 접속 인트로 스플래시 컴포넌트 정의함
// props.onFinish: 인트로가 끝났을 때 상위(App)에서 호출할 콜백
export default function SplashScreen({ onFinish }) {
  // 인트로가 끝나갈 때 페이드아웃 애니메이션 줄지 여부를 관리하는 상태값임
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 총 인트로 길이 5초 기준으로 타이머 두 개 설정함
    // 4.3초 즈음부터는 페이드아웃 시작함
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 4300);

    // 5초가 지나면 onFinish 콜백 호출해서 스플래시 종료함
    const finishTimeout = setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish();
      }
    }, 5000);

    // 컴포넌트가 언마운트될 때 타이머 정리함
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    // 3D 인트로 전체를 감싸는 루트 요소임
    // isFading 상태에 따라 페이드아웃용 클래스 추가함
    <div
      className={`splash-3d ${
        isFading ? "splash-3d--fade-out" : ""
      }`}
      aria-hidden="true" // 접근성 측면에서 메인 콘텐츠와는 별개 장식 요소라 숨김 처리함
    >
      {/* 3D 공간 내부 컨테이너임. 퍼스펙티브 안에서 3D 요소들을 배치함 */}
      <div className="splash-3d__inner">
        {/* 뒤쪽 바닥 그리드 플레인임. 원근감을 강조하는 요소임 */}
        <div className="splash-3d__grid splash-3d__grid--back" />
        {/* 카메라에 더 가까운 앞쪽 그리드 플레인임. 약간 다른 속도로 움직여서 패럴랙스 느낌 줌 */}
        <div className="splash-3d__grid splash-3d__grid--front" />

        {/* 중앙 포털 본체임. 여러 개의 링과 코어를 겹쳐서 포털 느낌 냄 */}
        <div className="splash-3d__portal">
          {/* 가장 바깥쪽 링임. 느리게 회전하면서 붉은 아우라 담당함 */}
          <div className="splash-3d__ring splash-3d__ring--outer" />
          {/* 중간 링임. 외곽보다 조금 빠르게 회전함 */}
          <div className="splash-3d__ring splash-3d__ring--middle" />
          {/* 안쪽 링임. 가장 빠르게 회전하고 빛이 강하게 돌아가는 느낌 줌 */}
          <div className="splash-3d__ring splash-3d__ring--inner" />
          {/* 포털 중앙 코어임. 펄스 효과로 포털이 살아있는 것처럼 보이게 함 */}
          <div className="splash-3d__core" />
        </div>

        {/* 부팅 로그 미니텍스트 */}
        <div className="splash-3d__label font-mono-accent">
          [boot] initializing darknet gateway...
        </div>

        {/* 메인 타이틀 텍스트. 폰트-M42 */}
        <div className="splash-3d__title font-m42">
          ACCESSING DARK WEB
        </div>

        {/* 서브 텍스트 */}
        <div className="splash-3d__subtitle font-mono-accent">
          3-layer onion route · cipher lock · handshake
        </div>
      </div>
    </div>
  );
}
